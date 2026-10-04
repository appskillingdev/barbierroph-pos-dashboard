# Barbierro Analytics Views (`v_*`) — Implementation Prompt

Source: `documentation/Barbierro DB architecture (10_03).xlsx`, sheets `v_mtd_report`,
`v_barbers_performance`, `v_customer_lifetime_value`. (`v_top_services` is an empty placeholder
tab — skip it.) Every column below is taken from the sheet's Field name / Field Description /
References. Where a description is blank or says `? Clarify with kuya paul`, the column is still
included, marked **TBD**, and must be emitted as a placeholder (see "TBD convention" below).

Work in the backend repo. The schema context is the **post-10/03 model**:

- `bph_sales` is now the **header** (one row per transaction): `transaction_id`,
  `transaction_date`, `customer_id`, `branch_id`, `total_amount`, `payment_method`, counts,
  `created_by`, `remarks`. It has **no** `barber_id` or `service_code`.
- `bph_sales_item` holds the **line items** per transaction: `transaction_id`, `item_number`,
  `service_code`, `barber_id`, `amount`. PK `(transaction_id, item_number)`.
- `bph_barbers.commission` is a Decimal fraction (0.01–1.00) = barber's cut.
- `bph_customers.visit_count` exists.

Any barber-level figure must therefore go through `bph_sales_item`, and any date/customer/branch
figure through `bph_sales` (join on `transaction_id`). Do **not** sum `total_amount` across joined
item rows — that double-counts. Use `bph_sales.total_amount` for transaction-level totals and
`bph_sales_item.amount` for per-barber totals.

---

## 0. Shared definitions (use these across all views)

| Term | Definition |
|---|---|
| `period` | `to_char(transaction_date, 'YYYYMM')` → `'202601'` for January 2026 (sheet example: `202601 (January 2026)`). |
| headcount | `COUNT(DISTINCT transaction_id)` for the period. One transaction = one head/customer visit. |
| operational day | A distinct `transaction_date` that has at least one sale. |
| actual_sales | `SUM(bph_sales.total_amount)` for the period (header level, no item join). |
| barber payout | For each `bph_sales_item` row: `amount * barber.commission` (commission NULL → treat as 0 and report it). |

Percentages are stored as **fractions** (0.15 = 15%), NULL-safe: guard every division with
`NULLIF(denominator, 0)`.

### TBD convention (for blank / "clarify" descriptions)
- Keep the column in the view with its sheet name and type.
- Emit it as `NULL::<type> AS <column>` with an SQL comment directly above it:
  `-- TBD: logic not yet defined in workbook (<reason>). Replace when logic is provided.`
- Where other columns depend on a TBD column, still write their formula against the column
  name so they fill in automatically once the TBD is replaced. (They will show NULL until then —
  that is expected, don't "fix" it with a fallback.)
- In your final message, list every TBD column so the user can supply logic.

---

## 1. `v_mtd_report` — one row per `period`

Grain: one row per month. Build with CTEs: `monthly` (base aggregates) → `payouts` → final
select, so dependent columns can reference each other cleanly.

| Column | Type | Logic |
|---|---|---|
| `period` | String | `YYYYMM` from `bph_sales.transaction_date`. |
| `actual_sales` | Decimal | `SUM(total_amount)` for the period. |
| `headcount` | Integer | `COUNT(DISTINCT transaction_id)` for the period. |
| `headcount_prev_month_perctg` | Decimal (fraction) | `(headcount − prev_headcount) / NULLIF(prev_headcount, 0)`. `prev_headcount` = headcount of the immediately preceding period (use `LAG` ordered by period). |
| `headcount_gained_lost` | Integer | `headcount − prev_headcount` (signed delta). |
| `growth_vs_ly` | Decimal | **TBD** — sheet says `? Clarify with kuya paul`. |
| `average_cost` | Decimal | `actual_sales / NULLIF(headcount, 0)` — average spend per head. |
| `average_heads_per_barber` | Decimal | `headcount / NULLIF(average_barbers_on_duty, 0) / NULLIF(operational_days_count, 0)` — implement literally as written in the sheet. |
| `average_barbers_on_duty` | Decimal | My reading of "summarize # of visits… count interval between dates": for each operational day, `COUNT(DISTINCT barber_id)` from `bph_sales_item` joined to `bph_sales` on that day; then `AVG` across the period's operational days. **Confirm this reading** (flag in final message). |
| `average_daily_sales` | Decimal | `actual_sales / NULLIF(operational_days_count, 0)`. |
| `average_daily_headcount` | Decimal | `headcount / NULLIF(operational_days_count, 0)`. |
| `operational_days_count` | Integer | `COUNT(DISTINCT transaction_date)` for the period. |
| `total_barber_payouts` | Decimal | `SUM(bph_sales_item.amount * COALESCE(bph_barbers.commission, 0))` for all items in the period. |
| `total_staff_payouts` | Decimal | **TBD** — sheet says `? Clarify with kuya paul`. |
| `grand_total_payouts` | Decimal | **TBD** — sheet description is blank. (Do not assume `barber + staff`; leave TBD.) |
| `monthly_gross_profit` | Decimal | `actual_sales − grand_total_payouts`. Depends on TBD column → will be NULL until filled. |
| `monthly_share` | Decimal (fraction) | `monthly_gross_profit / NULLIF(actual_sales, 0)`. |
| `average_monthly_payout` | Decimal | `total_barber_payouts / NULLIF(average_barbers_on_duty, 0)`. |
| `average_daily_payout` | Decimal | `average_monthly_payout / NULLIF(operational_days_count, 0)`. |

Notes:
- The sheet names the field `growth vs ly ` (with spaces). Use `growth_vs_ly` in SQL.
- The Prisma model `VMtdReport` in `prisma/models/analytics_model.prisma` already has `@@map("v_mtd_report")` (uncommented in the working tree). Keep its fields in sync with the final view columns.

---

## 2. `v_barbers_performance` — two sections in the sheet, implemented as two views

**Important constraint:** the sheet's `field~n` columns are *dynamic* — one column per month,
named `MM-YYYY` (e.g. `01-2024`, `02-2024`). A Postgres `VIEW` cannot have a column set that
changes with the data. So implement the **long format** below and do the pivot in the API layer
(or ask the user whether they want a fixed-width pivot generated per year). Do not try to hard-code
month columns in the view.

### 2a. `v_barbers_performance` — one row per (barber, period)
Replaces the "Total Transactions per barber" section (count) and "Total Transactions per barber
(IN PESO)" section (amount) in a single view.

| Column | Type | Logic |
|---|---|---|
| `barber_id` | String | From `bph_barbers.barber_id`. |
| `barber_name` | String | `bph_barbers.full_name`. |
| `period` | String | `YYYYMM` from the joined `bph_sales.transaction_date`. |
| `total_transactions` | Integer | `COUNT(DISTINCT bph_sales_item.transaction_id)` for that barber & period — "headcount of sales per month on assigned barber". |
| `total_amount` | Decimal | `SUM(bph_sales_item.amount)` for that barber & period — the "IN PESO" total. |

Source: `bph_sales_item` JOIN `bph_sales` (on `transaction_id`) JOIN `bph_barbers` (on `barber_id`).
Group by `barber_id, barber_name, period`.

### 2b. `v_barbers_performance_detail` — one row per (barber, date)
Replaces "Detailed Breakdown per barber IN PESO". The sheet says "if a period/bucket is selected,
break down each date under that month" — that selection is a **query filter on `period`** at the
API layer, not something the view does.

| Column | Type | Logic |
|---|---|---|
| `barber_id` | String | As above. |
| `barber_name` | String | As above. |
| `period` | String | `YYYYMM`, so the API can filter by period. |
| `date` | Date | `bph_sales.transaction_date`. |
| `amount` | Decimal | `SUM(bph_sales_item.amount)` for that barber on that date. |
| `commission_amount` | Decimal | `SUM(bph_sales_item.amount * COALESCE(bph_barbers.commission, 0))` for that barber on that date. My reading of "get the commission assigned to barber, deduct amount − commission perctg": barber's payout = amount × commission. **Confirm** (flag in final message). |

Group by `barber_id, barber_name, period, date`.

---

## 3. `v_customer_lifetime_value` — one row per customer

Base customer data comes from `bph_customers`; visit dates come from `bph_sales`. Build with a CTE
`visits` (`customer_id`, `visit_dates` count, `first`, `latest`) and a CTE `latest_items`
(the latest transaction's item row per customer).

| Column | Type | Logic |
|---|---|---|
| `customer_id` | Guid/String | `bph_customers.customer_id`. |
| `customer_name` | String | `bph_customers.customer_name`. |
| `visit_count` | Integer | `bph_customers.visit_count` (sheet says "from bph_customers"). |
| `visit_interval` | Decimal | Average days between visits: `(visit_date_latest − visit_date_first) / NULLIF(number_of_visits − 1, 0)`, where `number_of_visits = COUNT(DISTINCT transaction_id)` from `bph_sales`. NULL when fewer than 2 visits. My reading of "count between dates of total visits" — **confirm**. |
| `average_visit` | Decimal | **TBD** — description blank. |
| `clv` | Decimal | **TBD** — description says only `Customer Lifecycle Value`; no logic given. (Sheet's data type cell is blank; Prisma model uses Decimal — use Decimal.) |
| `visit_date_first` | Date | `MIN(bph_sales.transaction_date)` for the customer. |
| `visit_date_latest` | Date | `MAX(bph_sales.transaction_date)` for the customer. |
| `projected_date_return` | Date | `visit_date_latest + ROUND(visit_interval)` days. NULL if `visit_interval` is NULL. |
| `lastest_barber_assigned` | String | `barber_id` of the customer's latest transaction. If that transaction has several items, use the item with the lowest `item_number`. **Keep the sheet's spelling `lastest_`** in the DB column (the sheet is the source of truth; flag the typo so the user can confirm a rename to `latest_`). |
| `lastest_service` | String | `service_code` of the same latest item row (same tie-break). Same spelling note. |

Note: the sheet's `References` column for `visit_count` and the visit-based columns all say "from
bph_sales"/"from bph_customers" — follow the field descriptions above exactly.

---

## 4. Database & Prisma steps

1. Prisma does not generate view SQL from `view` blocks. Create the migration with
   `npx prisma migrate dev --create-only --name analytics_views` (or write it by hand under
   `prisma/migrations/<timestamp>_analytics_views/migration.sql`, matching the naming of the
   existing migration folders). Put the `CREATE OR REPLACE VIEW` statements there.
   - The initial migration `prisma/migrations/20260809163920_initial/migration.sql` contains a
     truncated `CREATE VIEW "v_barbers_performance" AS SELECT` with no body. Do **not** build on
     it; replace that view in the new migration with `DROP VIEW IF EXISTS` first, then create the
     new versions.
2. Update `prisma/models/analytics_model.prisma` so each view block matches its final columns:
   - `VMtdReport` — already mapped; sync fields.
   - `VBarbersPerformance` — currently commented out; replace with the 2a shape and
     `@@map("v_barbers_performance")`.
   - Add `VBarbersPerformanceDetail` with `@@map("v_barbers_performance_detail")`.
   - `VCustomerLifetimeValue` — currently has no `@@map`; add `@@map("v_customer_lifetime_value")`
     and map `lastest_*` columns with `@map("lastest_barber_assigned")` / `@map("lastest_service")`.
   - Keep the existing `@@ignore` decision consistent across views — decide whether these should be
     queryable via Prisma Client (remove `@@ignore`) or stay raw-SQL-only like the rest of this repo
     (the runtime queries go through pgtyped `.sql` files, not Prisma Client). Flag which you chose.
3. Run `npx prisma validate` and `npx prisma generate` (or whatever the repo uses — `prisma` is in
   `package.json`), then run the migration against the dev DB and confirm the views exist with
   `SELECT * FROM v_mtd_report LIMIT 5;` etc.

---

## 5. Validation (do this before reporting done)

- **Reconciliation check:** for each period, `SUM(bph_sales_item.amount)` must equal
  `SUM(bph_sales.total_amount)` for the same transactions. If it doesn't, report the mismatching
  `transaction_id`s — don't silently adjust either side.
- `v_mtd_report.actual_sales` for a month must equal the sum of `v_barbers_performance.total_amount`
  for that month. Assert this in a test.
- Spot-check 2–3 hand-computed rows: one month, one barber, one customer with ≥2 visits.
- Add `test/views.test.ts` (vitest, same style as the other `test/*.test.ts` files and
  `test/helpers/authenticatedAgent.ts` setup) asserting: each view returns rows, column names match
  the Prisma model, and the reconciliation above holds. Seed-data-dependent assertions should use
  the existing seed (`prisma/seed.ts`) rather than hard-coded production values.
- Run `npm run type-check`, `npm run lint`, and `npm run test:run`.

---

## 6. Items to flag back to the user (do not guess silently)

1. `growth_vs_ly` and `total_staff_payouts` — "Clarify with kuya paul". Left as TBD.
2. Blank descriptions — `grand_total_payouts` (v_mtd_report), `average_visit` and `clv` (v_customer_lifetime_value). Left as TBD.
3. My interpretations to confirm:
   - `average_barbers_on_duty` = average over operational days of distinct barbers with sales.
   - `visit_interval` = (latest − first) / (visits − 1).
   - `commission_amount` / barber payout = `amount × commission` (not `amount − …`).
   - `headcount` = distinct transactions, not distinct customers.
4. `v_barbers_performance` dynamic `field~n` columns cannot be a plain SQL view — delivered as
   long-format views plus API-side pivot. Confirm this is acceptable, or say if you want a
   per-year fixed-width pivot instead.
5. Column spelling `lastest_*` kept as in the workbook.
6. `v_top_services` is an empty tab in the workbook — not implemented.
