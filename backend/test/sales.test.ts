import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Sales API", () => {
  const testTransactionId = `TEST-TXN-${Date.now()}`;

  afterAll(async () => {
    // Clean up test data
    await pool.query("DELETE FROM bph_sales WHERE transaction_id = $1", [
      testTransactionId,
    ]);
    await pool.end();
  });

  describe("POST /sales", () => {
    it("should create a new sale", async () => {
      const newSale = {
        transactionId: testTransactionId,
        transactionDate: "2024-01-15",
        customerId: "cust001",
        branchId: "branch001",
        barberId: "barber001",
        serviceCode: "REG-CUT",
        totalAmount: 150.0,
        paymentMethod: "cash",
        referenceNo: "REF-TEST-001",
        count1: 0,
        count5: 0,
        count10: 0,
        count20: 1,
        count50: 0,
        count100: 1,
        count200: 0,
        count500: 0,
        count1000: 0,
        createdBy: "owner001",
      };

      const response = await request(app)
        .post("/sales")
        .send(newSale)
        .expect(201);

      expect(response.body).toHaveProperty("transactionId", testTransactionId);
      expect(response.body).toHaveProperty("totalAmount", "150");
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteSale = {
        transactionId: "INCOMPLETE-TXN",
        transactionDate: "2024-01-15",
      };

      await request(app).post("/sales").send(incompleteSale).expect(400);
    });
  });

  describe("GET /sales", () => {
    it("should get all sales", async () => {
      const response = await request(app).get("/sales").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /sales/latest", () => {
    it("should get latest sales with limit", async () => {
      const response = await request(app)
        .get("/sales/latest?limit=5")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /sales/transaction/:transactionId", () => {
    it("should get sales by transaction ID", async () => {
      const response = await request(app)
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
      const response = await request(app)
        .get("/sales/date-range?startDate=2024-01-01&endDate=2024-12-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await request(app).get("/sales/date-range").expect(400);
    });
  });

  describe("GET /sales/customer/:customerId", () => {
    it("should get sales by customer", async () => {
      const response = await request(app)
        .get("/sales/customer/cust001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/branch/:branchId", () => {
    it("should get sales by branch", async () => {
      const response = await request(app)
        .get("/sales/branch/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/barber/:barberId", () => {
    it("should get sales by barber", async () => {
      const response = await request(app)
        .get("/sales/barber/barber001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/payment-method/:paymentMethod", () => {
    it("should get sales by payment method", async () => {
      const response = await request(app)
        .get("/sales/payment-method/cash")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /sales/:transactionId", () => {
    it("should update a sale", async () => {
      const updates = {
        totalAmount: 175.0,
        paymentMethod: "gcash",
      };

      const response = await request(app)
        .put(`/sales/${testTransactionId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("transaction_id", testTransactionId);
      expect(response.body).toHaveProperty("total_amount", "175");
    });

    it("should return 404 for non-existent transaction ID", async () => {
      await request(app)
        .put("/sales/NON-EXISTENT-TXN")
        .send({ totalAmount: 100 })
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

      await request(app).delete(`/sales/${tempTxnId}`).expect(200);
    });

    it("should return 404 for non-existent transaction ID", async () => {
      await request(app).delete("/sales/NON-EXISTENT-TXN").expect(404);
    });
  });
});
