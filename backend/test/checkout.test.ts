import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateCheckoutParams,
  IUpdateCheckoutParams,
} from "../src/queries/pos/checkout.queries.js";

describe("Checkout API", () => {
  let testCheckoutId: number;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

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
      const newCheckout: ICreateCheckoutParams = {
        id: `TEST-CHECKOUT-${Date.now()}`,
        customer_name: "Test Customer",
        assigned_branch: "branch001",
        assigned_barber: "barber001",
        service_code: "REG-CUT",
        amount: 150.0,
        payment_method: "cash",
        reference_number: "REF-TEST-001",
        purchased_at: "2024-01-15",
      };

      const response = await agent
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
      const response = await agent.get("/checkout").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort checkouts at the database level", async () => {
      const response = await agent
        .get(
          "/checkout?assigned_branch=branch001&sortBy=purchased_at&sortOrder=desc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /checkout/:checkoutId", () => {
    it("should get checkout by ID", async () => {
      const response = await agent
        .get(`/checkout/${testCheckoutId}`)
        .expect(200);

      expect(response.body).toHaveProperty("checkout_id", testCheckoutId);
    });

    it("should return 404 for non-existent checkout", async () => {
      await agent.get("/checkout/999999").expect(404);
    });
  });

  describe("GET /checkout/branch/:branchId", () => {
    it("should get checkouts by branch", async () => {
      const response = await agent
        .get("/checkout/branch/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /checkout/date-range", () => {
    it("should get checkouts by date range", async () => {
      const response = await agent
        .get("/checkout/date-range?startDate=2024-01-01&endDate=2024-12-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await agent.get("/checkout/date-range").expect(400);
    });
  });

  describe("GET /checkout/customer", () => {
    it("should get checkouts by customer name", async () => {
      const response = await agent
        .get("/checkout/customer?name=Test")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /checkout/:checkoutId", () => {
    it("should update a checkout", async () => {
      const updates: Partial<IUpdateCheckoutParams> = {
        amount: 175.0,
        payment_method: "gcash",
      };

      const response = await agent
        .put(`/checkout/${testCheckoutId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("checkout_id", testCheckoutId);
      expect(response.body).toHaveProperty("checkout_total_amount", "175");
    });
  });

  describe("DELETE /checkout/:checkoutId", () => {
    it("should delete a checkout", async () => {
      await agent.delete(`/checkout/${testCheckoutId}`).expect(200);
    });

    it("should return 404 for non-existent checkout", async () => {
      await agent.delete("/checkout/999999").expect(404);
    });
  });
});
