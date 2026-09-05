import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Payment Methods API", () => {
  const testPaymentMethod = `test-payment-${Date.now()}`;

  afterAll(async () => {
    await pool.query(
      "DELETE FROM bph_paymentmethods WHERE payment_method_name = $1",
      [testPaymentMethod],
    );
    await pool.end();
  });

  describe("POST /payment-methods", () => {
    it("should create a new payment method", async () => {
      const newPaymentMethod = {
        paymentMethodName: testPaymentMethod,
        paymentMethodDescription: "Test Payment Method",
        paymentMethodValidity: "ACTIVE",
      };

      const response = await request(app)
        .post("/payment-methods")
        .send(newPaymentMethod)
        .expect(201);

      expect(response.body).toHaveProperty(
        "payment_method_name",
        testPaymentMethod,
      );
    });
  });

  describe("GET /payment-methods", () => {
    it("should get all payment methods", async () => {
      const response = await request(app).get("/payment-methods").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /payment-methods/:paymentMethodName", () => {
    it("should get payment method by name", async () => {
      const response = await request(app)
        .get(`/payment-methods/${testPaymentMethod}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "payment_method_name",
        testPaymentMethod,
      );
    });

    it("should return 404 for non-existent payment method", async () => {
      await request(app).get("/payment-methods/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /payment-methods/active", () => {
    it("should get active payment methods", async () => {
      const response = await request(app)
        .get("/payment-methods/active")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /payment-methods/:paymentMethodName", () => {
    it("should update a payment method", async () => {
      const updates = {
        paymentMethodDescription: "Updated Test Payment Method",
        paymentMethodValidity: "INACTIVE",
      };

      const response = await request(app)
        .put(`/payment-methods/${testPaymentMethod}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty(
        "payment_method_name",
        testPaymentMethod,
      );
      expect(response.body).toHaveProperty(
        "payment_method_description",
        "Updated Test Payment Method",
      );
    });
  });

  describe("DELETE /payment-methods/:paymentMethodName", () => {
    it("should delete a payment method", async () => {
      await request(app)
        .delete(`/payment-methods/${testPaymentMethod}`)
        .expect(200);
    });

    it("should return 404 for non-existent payment method", async () => {
      await request(app).delete("/payment-methods/NON-EXISTENT").expect(404);
    });
  });
});
