-- Analytics views (v_*) from the 10/03 workbook.
-- Barber-level figures come from bph_sales_item; date/customer/branch figures
-- from bph_sales (header). Percentages are fractions (0.15 = 15%).

-- Replace the empty placeholder view created by the initial migration
DROP VIEW IF EXISTS "v_barbers_performance";
DROP VIEW IF EXISTS "v_barbers_performance_detail";
DROP VIEW IF EXISTS "v_mtd_report";
DROP VIEW IF EXISTS "v_customer_lifetime_value";

-- One row per month (period = YYYYMM)
CREATE VIEW "v_mtd_report" AS
WITH monthly AS (
    SELECT
        to_char(s.transaction_date, 'YYYYMM') AS period,
        SUM(s.total_amount) AS actual_sales,
        COUNT(DISTINCT s.transaction_id)::INTEGER AS headcount,
        COUNT(DISTINCT s.transaction_date)::INTEGER AS operational_days_count
    FROM bph_sales s
    GROUP BY 1
),
daily_barbers AS (
    SELECT
        to_char(s.transaction_date, 'YYYYMM') AS period,
        s.transaction_date,
        COUNT(DISTINCT i.barber_id) AS barbers_on_duty
    FROM bph_sales s
    JOIN bph_sales_item i ON i.transaction_id = s.transaction_id
    GROUP BY 1, 2
),
on_duty AS (
    SELECT period, AVG(barbers_on_duty) AS average_barbers_on_duty
    FROM daily_barbers
    GROUP BY period
),
payouts AS (
    SELECT
        to_char(s.transaction_date, 'YYYYMM') AS period,
        SUM(i.amount * COALESCE(b.commission, 0)) AS total_barber_payouts
    FROM bph_sales s
    JOIN bph_sales_item i ON i.transaction_id = s.transaction_id
    JOIN bph_barbers b ON b.barber_id = i.barber_id
    GROUP BY 1
),
base AS (
    SELECT
        m.*,
        prev.headcount AS prev_headcount,
        d.average_barbers_on_duty,
        p.total_barber_payouts,
        -- TBD: logic not yet defined in workbook ("? Clarify with kuya paul"). Replace when logic is provided.
        NULL::DECIMAL AS growth_vs_ly,
        -- TBD: logic not yet defined in workbook ("? Clarify with kuya paul"). Replace when logic is provided.
        NULL::DECIMAL AS total_staff_payouts,
        -- TBD: logic not yet defined in workbook (description is blank). Replace when logic is provided.
        NULL::DECIMAL AS grand_total_payouts
    FROM monthly m
    -- previous calendar month; NULL when that month had no sales
    LEFT JOIN monthly prev
        ON prev.period = to_char(to_date(m.period, 'YYYYMM') - INTERVAL '1 month', 'YYYYMM')
    LEFT JOIN on_duty d ON d.period = m.period
    LEFT JOIN payouts p ON p.period = m.period
),
derived AS (
    SELECT
        base.*,
        actual_sales - grand_total_payouts AS monthly_gross_profit,
        total_barber_payouts / NULLIF(average_barbers_on_duty, 0) AS average_monthly_payout
    FROM base
)
SELECT
    period,
    actual_sales,
    headcount,
    (headcount - prev_headcount)::DECIMAL / NULLIF(prev_headcount, 0) AS headcount_prev_month_perctg,
    headcount - prev_headcount AS headcount_gained_lost,
    growth_vs_ly,
    actual_sales / NULLIF(headcount, 0) AS average_cost,
    headcount::DECIMAL / NULLIF(average_barbers_on_duty, 0) / NULLIF(operational_days_count, 0) AS average_heads_per_barber,
    average_barbers_on_duty,
    actual_sales / NULLIF(operational_days_count, 0) AS average_daily_sales,
    headcount::DECIMAL / NULLIF(operational_days_count, 0) AS average_daily_headcount,
    operational_days_count,
    total_barber_payouts,
    total_staff_payouts,
    grand_total_payouts,
    monthly_gross_profit,
    monthly_gross_profit / NULLIF(actual_sales, 0) AS monthly_share,
    average_monthly_payout,
    average_monthly_payout / NULLIF(operational_days_count, 0) AS average_daily_payout
FROM derived;

-- One row per (barber, period). The workbook's dynamic per-month columns
-- (field~n = MM-YYYY) are pivoted in the API layer from this long format.
CREATE VIEW "v_barbers_performance" AS
SELECT
    b.barber_id,
    b.full_name AS barber_name,
    to_char(s.transaction_date, 'YYYYMM') AS period,
    COUNT(DISTINCT i.transaction_id)::INTEGER AS total_transactions,
    SUM(i.amount) AS total_amount
FROM bph_sales_item i
JOIN bph_sales s ON s.transaction_id = i.transaction_id
JOIN bph_barbers b ON b.barber_id = i.barber_id
GROUP BY b.barber_id, b.full_name, to_char(s.transaction_date, 'YYYYMM');

-- One row per (barber, date); filter by period to break a month down by date
CREATE VIEW "v_barbers_performance_detail" AS
SELECT
    b.barber_id,
    b.full_name AS barber_name,
    to_char(s.transaction_date, 'YYYYMM') AS period,
    s.transaction_date AS date,
    SUM(i.amount) AS amount,
    SUM(i.amount * COALESCE(b.commission, 0)) AS commission_amount
FROM bph_sales_item i
JOIN bph_sales s ON s.transaction_id = i.transaction_id
JOIN bph_barbers b ON b.barber_id = i.barber_id
GROUP BY b.barber_id, b.full_name, s.transaction_date;

-- One row per customer
CREATE VIEW "v_customer_lifetime_value" AS
WITH visits AS (
    SELECT
        customer_id,
        COUNT(DISTINCT transaction_id) AS number_of_visits,
        MIN(transaction_date) AS visit_date_first,
        MAX(transaction_date) AS visit_date_latest
    FROM bph_sales
    GROUP BY customer_id
),
intervals AS (
    SELECT
        visits.*,
        -- average days between visits; NULL with fewer than 2 visits
        (visit_date_latest - visit_date_first)::DECIMAL / NULLIF(number_of_visits - 1, 0) AS visit_interval
    FROM visits
),
latest_items AS (
    -- item with the lowest item_number of the customer's latest transaction
    SELECT DISTINCT ON (s.customer_id)
        s.customer_id,
        i.barber_id,
        i.service_code
    FROM bph_sales s
    JOIN bph_sales_item i ON i.transaction_id = s.transaction_id
    ORDER BY s.customer_id, s.transaction_date DESC, s.transaction_id DESC, i.item_number
)
SELECT
    c.customer_id,
    c.customer_name,
    c.visit_count,
    v.visit_interval,
    -- TBD: logic not yet defined in workbook (description is blank). Replace when logic is provided.
    NULL::DECIMAL AS average_visit,
    -- TBD: logic not yet defined in workbook (only "Customer Lifecycle Value"). Replace when logic is provided.
    NULL::DECIMAL AS clv,
    v.visit_date_first,
    v.visit_date_latest,
    v.visit_date_latest + ROUND(v.visit_interval)::INTEGER AS projected_date_return,
    li.barber_id AS lastest_barber_assigned,
    li.service_code AS lastest_service
FROM bph_customers c
LEFT JOIN intervals v ON v.customer_id = c.customer_id
LEFT JOIN latest_items li ON li.customer_id = c.customer_id;
