import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreatePaymentMethodParams,
  IUpdatePaymentMethodParams,
} from "../src/queries/paymentmethods/paymentmethods.queries.js";

describe("Payment Methods API", () => {
  const testPaymentMethod = `test-payment-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query(
      "DELETE FROM bph_paymentmethods WHERE payment_method_name = $1",
      [testPaymentMethod],
    );
    await pool.end();
  });

  describe("POST /payment-methods", () => {
    it("should create a new payment method", async () => {
      const newPaymentMethod: ICreatePaymentMethodParams = {
        payment_method_id: `TEST-PAYMENT-${Date.now()}`,
        payment_method_name: testPaymentMethod,
        bank_number: "0001",
      };

      const response = await agent
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
      const response = await agent.get("/payment-methods").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort payment methods at the database level", async () => {
      const response = await agent
        .get(
          "/payment-methods?payment_method_name.contains=card&sortBy=payment_method_name&sortOrder=asc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /payment-methods/:paymentMethodName", () => {
    it("should get payment method by name", async () => {
      const response = await agent
        .get(`/payment-methods/${testPaymentMethod}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "payment_method_name",
        testPaymentMethod,
      );
    });

    it("should return 404 for non-existent payment method", async () => {
      await agent.get("/payment-methods/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /payment-methods/active", () => {
    it("should get active payment methods", async () => {
      const response = await agent.get("/payment-methods/active").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /payment-methods/:paymentMethodName", () => {
    it("should update a payment method", async () => {
      const updates: Partial<IUpdatePaymentMethodParams> = {
        bank_number: "0002",
      };

      const response = await agent
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
      await agent.delete(`/payment-methods/${testPaymentMethod}`).expect(200);
    });

    it("should return 404 for non-existent payment method", async () => {
      await agent.delete("/payment-methods/NON-EXISTENT").expect(404);
    });
  });
});
