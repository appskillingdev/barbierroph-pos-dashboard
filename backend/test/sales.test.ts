import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateSaleParams,
  IUpdateSaleParams,
} from "../src/queries/sales/sales.queries.js";

describe("Sales API", () => {
  const testTransactionId = `TEST-TXN-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    // Clean up test data
    await pool.query("DELETE FROM bph_sales WHERE transaction_id = $1", [
      testTransactionId,
    ]);
    await pool.end();
  });

  describe("POST /sales", () => {
    it("should create a new sale", async () => {
      const newSale: ICreateSaleParams = {
        transaction_id: testTransactionId,
        transaction_date: "2024-01-15",
        customer_id: "cust001",
        branch_id: "branch001",
        barber_id: "barber001",
        service_code: "REG-CUT",
        total_amount: 150.0,
        payment_method: "cash",
        reference_no: "REF-TEST-001",
        count_1: 0,
        count_5: 0,
        count_10: 0,
        count_20: 1,
        count_50: 0,
        count_100: 1,
        count_200: 0,
        count_500: 0,
        count_1000: 0,
        created_by: "owner001",
      };

      const response = await agent.post("/sales").send(newSale).expect(201);

      expect(response.body).toHaveProperty("transactionId", testTransactionId);
      expect(response.body).toHaveProperty("totalAmount", "150");
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteSale: Partial<ICreateSaleParams> = {
        transaction_id: "INCOMPLETE-TXN",
        transaction_date: "2024-01-15",
      };

      await agent.post("/sales").send(incompleteSale).expect(400);
    });
  });

  describe("GET /sales", () => {
    it("should get all sales", async () => {
      const response = await agent.get("/sales").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort sales at the database level", async () => {
      const response = await agent
        .get(
          "/sales?payment_method=cash&sortBy=transaction_date&sortOrder=desc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/latest", () => {
    it("should get latest sales with limit", async () => {
      const response = await agent.get("/sales/latest?limit=5").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /sales/transaction/:transactionId", () => {
    it("should get sales by transaction ID", async () => {
      const response = await agent
        .get(`/sales/transaction/${testTransactionId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty(
          "transaction_id",
          testTransactionId,
        );
      }
    });
  });

  describe("GET /sales/date-range", () => {
    it("should get sales by date range", async () => {
      const response = await agent
        .get("/sales/date-range?startDate=2024-01-01&endDate=2024-12-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await agent.get("/sales/date-range").expect(400);
    });
  });

  describe("GET /sales/customer/:customerId", () => {
    it("should get sales by customer", async () => {
      const response = await agent.get("/sales/customer/cust001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/branch/:branchId", () => {
    it("should get sales by branch", async () => {
      const response = await agent.get("/sales/branch/branch001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/barber/:barberId", () => {
    it("should get sales by barber", async () => {
      const response = await agent.get("/sales/barber/barber001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/payment-method/:paymentMethod", () => {
    it("should get sales by payment method", async () => {
      const response = await agent
        .get("/sales/payment-method/cash")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /sales/:transactionId", () => {
    it("should update a sale", async () => {
      const updates: Partial<IUpdateSaleParams> = {
        total_amount: 175.0,
        payment_method: "gcash",
      };

      const response = await agent
        .put(`/sales/${testTransactionId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("transaction_id", testTransactionId);
      expect(response.body).toHaveProperty("total_amount", "175");
    });

    it("should return 404 for non-existent transaction ID", async () => {
      await agent
        .put("/sales/NON-EXISTENT-TXN")
        .send({ total_amount: 100 } satisfies Partial<IUpdateSaleParams>)
        .expect(404);
    });
  });

  describe("DELETE /sales/:transactionId", () => {
    it("should delete a sale", async () => {
      // Create a temporary sale for deletion
      const tempTxnId = `TEMP-TXN-${Date.now()}`;
      await pool.query(
        `INSERT INTO bph_sales (transaction_id, transaction_date, customer_id, branch_id, barber_id, service_code, total_amount, payment_method, reference_no, count_1, count_5, count_10, count_20, count_50, count_100, count_200, count_500, count_1000, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
        [
          tempTxnId,
          "2024-01-15",
          "cust001",
          "branch001",
          "barber001",
          "REG-CUT",
          150,
          "cash",
          "REF-TEMP",
          0,
          0,
          0,
          1,
          0,
          1,
          0,
          0,
          0,
          "owner001",
        ],
      );

      await agent.delete(`/sales/${tempTxnId}`).expect(200);
    });

    it("should return 404 for non-existent transaction ID", async () => {
      await agent.delete("/sales/NON-EXISTENT-TXN").expect(404);
    });
  });
});
