import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Checkout API", () => {
  let testCheckoutId: number;

  afterAll(async () => {
    if (testCheckoutId) {
      await pool.query("DELETE FROM pos_checkout WHERE checkout_id = $1", [
        testCheckoutId,
      ]);
    }
    await pool.end();
  });

  describe("POST /checkout", () => {
    it("should create a new checkout", async () => {
      const newCheckout = {
        checkoutCustomerName: "Test Customer",
        checkoutBranchId: "branch001",
        checkoutBarberId: "barber001",
        checkoutServiceCode: "REG-CUT",
        checkoutTotalAmount: 150.0,
        checkoutPaymentMethod: "cash",
        checkoutReferenceNo: "REF-TEST-001",
        checkoutTransactionDate: "2024-01-15",
      };

      const response = await request(app)
        .post("/checkout")
        .send(newCheckout)
        .expect(201);

      testCheckoutId = response.body.checkout_id;
      expect(response.body).toHaveProperty("checkout_id");
      expect(response.body).toHaveProperty(
        "checkout_customer_name",
        "Test Customer",
      );
    });
  });

  describe("GET /checkout", () => {
    it("should get all checkouts", async () => {
      const response = await request(app).get("/checkout").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /checkout/:checkoutId", () => {
    it("should get checkout by ID", async () => {
      const response = await request(app)
        .get(`/checkout/${testCheckoutId}`)
        .expect(200);

      expect(response.body).toHaveProperty("checkout_id", testCheckoutId);
    });

    it("should return 404 for non-existent checkout", async () => {
      await request(app).get("/checkout/999999").expect(404);
    });
  });

  describe("GET /checkout/branch/:branchId", () => {
    it("should get checkouts by branch", async () => {
      const response = await request(app)
        .get("/checkout/branch/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /checkout/date-range", () => {
    it("should get checkouts by date range", async () => {
      const response = await request(app)
        .get("/checkout/date-range?startDate=2024-01-01&endDate=2024-12-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await request(app).get("/checkout/date-range").expect(400);
    });
  });

  describe("GET /checkout/customer", () => {
    it("should get checkouts by customer name", async () => {
      const response = await request(app)
        .get("/checkout/customer?name=Test")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /checkout/:checkoutId", () => {
    it("should update a checkout", async () => {
      const updates = {
        checkoutTotalAmount: 175.0,
        checkoutPaymentMethod: "gcash",
      };

      const response = await request(app)
        .put(`/checkout/${testCheckoutId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("checkout_id", testCheckoutId);
      expect(response.body).toHaveProperty("checkout_total_amount", "175");
    });
  });

  describe("DELETE /checkout/:checkoutId", () => {
    it("should delete a checkout", async () => {
      await request(app).delete(`/checkout/${testCheckoutId}`).expect(200);
    });

    it("should return 404 for non-existent checkout", async () => {
      await request(app).delete("/checkout/999999").expect(404);
    });
  });
});
