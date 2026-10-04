import { PrismaPg } from "@prisma/adapter-pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { pool } from "../src/database/client.js";
import { PrismaClient } from "../src/generated/prisma/client.js";

// Fixture sales in 2099 so they never overlap seed data or other test files.
// Seed barbers: barber001 commission 0.40, barber002 commission 0.30.
//   VIEW-TXN-1  2099-01-05  barber001 150 + barber002 100  (total 250)
//   VIEW-TXN-2  2099-01-06  barber001 150                  (total 150)
//   VIEW-TXN-3  2099-02-10  barber002 100                  (total 100)
const customerId = "TEST-VIEW-CUST";
const sales = [
  {
    date: "2099-01-05",
    items: [
      { amount: 150, barber: "barber001", service: "svc001" },
      { amount: 100, barber: "barber002", service: "svc003" },
    ],
    total: 250,
    transactionId: "VIEW-TXN-1",
  },
  {
    date: "2099-01-06",
    items: [{ amount: 150, barber: "barber001", service: "svc001" }],
    total: 150,
    transactionId: "VIEW-TXN-2",
  },
  {
    date: "2099-02-10",
    items: [{ amount: 100, barber: "barber002", service: "svc003" }],
    total: 100,
    transactionId: "VIEW-TXN-3",
  },
];
// Periods whose data is fully owned by the seed or by this file
const checkedPeriods = ["202608", "209901", "209902"];

const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function cleanUp(): Promise<void> {
  // Sale items cascade with the header
  await pool.query("DELETE FROM bph_sales WHERE customer_id = $1", [
    customerId,
  ]);
  await pool.query("DELETE FROM bph_customers WHERE customer_id = $1", [
    customerId,
  ]);
}

async function viewRow<T>(sql: string, params: unknown[]): Promise<T> {
  const { rows } = await pool.query(sql, params);
  return rows[0] as T;
}

describe("Analytics views", () => {
  beforeAll(async () => {
    await cleanUp();
    await pool.query(
      "INSERT INTO bph_customers (customer_id, customer_name, visit_count) VALUES ($1, 'View Test Customer', 3)",
      [customerId],
    );
    for (const sale of sales) {
      await pool.query(
        "INSERT INTO bph_sales (transaction_id, transaction_date, customer_id, branch_id, total_amount, payment_method) VALUES ($1, $2, $3, 'branch001', $4, 'pm001')",
        [sale.transactionId, sale.date, customerId, sale.total],
      );
      for (const [index, item] of sale.items.entries()) {
        await pool.query(
          "INSERT INTO bph_sales_item (transaction_id, item_number, service_code, barber_id, amount) VALUES ($1, $2, $3, $4, $5)",
          [
            sale.transactionId,
            String(index + 1).padStart(2, "0"),
            item.service,
            item.barber,
            item.amount,
          ],
        );
      }
    }
  });

  afterAll(async () => {
    await cleanUp();
    await prisma.$disconnect();
    await pool.end();
  });

  describe("Prisma models", () => {
    // findMany fails if a mapped column is missing or has the wrong type
    it("should read every view through Prisma Client", async () => {
      const [mtd, performance, detail, clv] = await Promise.all([
        prisma.vMtdReport.findMany({ where: { period: "209901" } }),
        prisma.vBarbersPerformance.findMany({ where: { period: "209901" } }),
        prisma.vBarbersPerformanceDetail.findMany({
          where: { period: "209901" },
        }),
        prisma.vCustomerLifetimeValue.findMany({ where: { customerId } }),
      ]);

      expect(mtd).toHaveLength(1);
      expect(performance).toHaveLength(2);
      expect(detail).toHaveLength(3);
      expect(clv).toHaveLength(1);
      expect(clv[0]?.latestBarberAssigned).toBe("barber002");
    });
  });

  describe("Reconciliation", () => {
    it("should have line items that add up to each sale total", async () => {
      const { rows } = await pool.query<{ transaction_id: string }>(
        `SELECT s.transaction_id
         FROM bph_sales s
         LEFT JOIN bph_sales_item i ON i.transaction_id = s.transaction_id
         WHERE to_char(s.transaction_date, 'YYYYMM') = ANY($1)
         GROUP BY s.transaction_id, s.total_amount
         HAVING s.total_amount <> COALESCE(SUM(i.amount), 0)`,
        [checkedPeriods],
      );

      expect(rows.map((row) => row.transaction_id)).toEqual([]);
    });

    it("should match v_mtd_report.actual_sales with v_barbers_performance", async () => {
      const { rows } = await pool.query<{
        actual_sales: string;
        barber_total: string;
        period: string;
      }>(
        `SELECT m.period, m.actual_sales, SUM(p.total_amount) AS barber_total
         FROM v_mtd_report m
         JOIN v_barbers_performance p ON p.period = m.period
         WHERE m.period = ANY($1)
         GROUP BY m.period, m.actual_sales`,
        [checkedPeriods],
      );

      expect(rows).toHaveLength(checkedPeriods.length);
      for (const row of rows) {
        expect(Number(row.barber_total)).toBe(Number(row.actual_sales));
      }
    });
  });

  describe("v_mtd_report", () => {
    it("should compute the monthly figures", async () => {
      const row = await viewRow<Record<string, null | number | string>>(
        "SELECT * FROM v_mtd_report WHERE period = $1",
        ["209901"],
      );

      // 2 transactions over 2 days; 2 barbers on 01-05 and 1 on 01-06
      expect(Number(row.actual_sales)).toBe(400);
      expect(row.headcount).toBe(2);
      expect(row.operational_days_count).toBe(2);
      expect(Number(row.average_cost)).toBe(200);
      expect(Number(row.average_barbers_on_duty)).toBe(1.5);
      expect(Number(row.average_heads_per_barber)).toBeCloseTo(2 / 1.5 / 2);
      expect(Number(row.average_daily_sales)).toBe(200);
      expect(Number(row.average_daily_headcount)).toBe(1);
      // 150 x 0.40 + 100 x 0.30 + 150 x 0.40
      expect(Number(row.total_barber_payouts)).toBe(150);
      expect(Number(row.average_monthly_payout)).toBe(100);
      expect(Number(row.average_daily_payout)).toBe(50);
      // no sales in 209812
      expect(row.headcount_prev_month_perctg).toBeNull();
      expect(row.headcount_gained_lost).toBeNull();
      // TBD columns and the columns that depend on them
      expect(row.growth_vs_ly).toBeNull();
      expect(row.total_staff_payouts).toBeNull();
      expect(row.grand_total_payouts).toBeNull();
      expect(row.monthly_gross_profit).toBeNull();
      expect(row.monthly_share).toBeNull();
    });

    it("should compare headcount with the previous month", async () => {
      const row = await viewRow<Record<string, null | number | string>>(
        "SELECT * FROM v_mtd_report WHERE period = $1",
        ["209902"],
      );

      expect(row.headcount).toBe(1);
      expect(row.headcount_gained_lost).toBe(-1);
      expect(Number(row.headcount_prev_month_perctg)).toBe(-0.5);
    });
  });

  describe("v_barbers_performance", () => {
    it("should total transactions and amount per barber and month", async () => {
      const row = await viewRow<Record<string, number | string>>(
        "SELECT * FROM v_barbers_performance WHERE barber_id = $1 AND period = $2",
        ["barber001", "209901"],
      );

      expect(row.barber_name).toBe("Jose Garcia");
      expect(row.total_transactions).toBe(2);
      expect(Number(row.total_amount)).toBe(300);
    });

    it("should break a barber's month down by date", async () => {
      const row = await viewRow<Record<string, number | string>>(
        "SELECT *, date::text AS date FROM v_barbers_performance_detail WHERE barber_id = $1 AND period = $2 AND date = $3",
        ["barber001", "209901", "2099-01-05"],
      );

      expect(row.date).toBe("2099-01-05");
      expect(Number(row.amount)).toBe(150);
      expect(Number(row.commission_amount)).toBe(60);
    });
  });

  describe("v_customer_lifetime_value", () => {
    it("should compute visit dates, interval and the latest visit", async () => {
      const row = await viewRow<Record<string, null | number | string>>(
        `SELECT *,
           visit_date_first::text AS visit_date_first,
           visit_date_latest::text AS visit_date_latest,
           projected_date_return::text AS projected_date_return
         FROM v_customer_lifetime_value WHERE customer_id = $1`,
        [customerId],
      );

      expect(row.visit_count).toBe(3);
      expect(row.visit_date_first).toBe("2099-01-05");
      expect(row.visit_date_latest).toBe("2099-02-10");
      // 36 days between first and latest over 2 intervals
      expect(Number(row.visit_interval)).toBe(18);
      expect(row.projected_date_return).toBe("2099-02-28");
      expect(row.lastest_barber_assigned).toBe("barber002");
      expect(row.lastest_service).toBe("svc003");
      expect(row.average_visit).toBeNull();
      expect(row.clv).toBeNull();
    });
  });
});
