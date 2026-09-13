import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateCustomerParams,
  IUpdateCustomerParams,
} from "../src/queries/customers/customers.queries.js";

describe("Customers API", () => {
  const testCustomerId = `TEST-CUST-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM bph_customers WHERE customer_id = $1", [
      testCustomerId,
    ]);
    await pool.end();
  });

  describe("POST /customers", () => {
    it("should create a new customer", async () => {
      const newCustomer: ICreateCustomerParams = {
        customer_id: testCustomerId,
        customer_name: "Test Customer",
        contact_number: "09123456789",
        email_address: "testcustomer@email.com",
        customer_address: "123 Test St",
        visit_count: 0,
      };

      const response = await agent
        .post("/customers")
        .send(newCustomer)
        .expect(201);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
    });
  });

  describe("GET /customers", () => {
    it("should get all customers", async () => {
      const response = await agent.get("/customers").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort customers at the database level", async () => {
      const response = await agent
        .get(
          "/customers?customer_name.contains=Test&sortBy=visit_count&sortOrder=desc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /customers/:customerId", () => {
    it("should get customer by ID", async () => {
      const response = await agent
        .get(`/customers/${testCustomerId}`)
        .expect(200);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
    });

    it("should return 404 for non-existent customer", async () => {
      await agent.get("/customers/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /customers/top", () => {
    it("should get top customers", async () => {
      const response = await agent.get("/customers/top?limit=10").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /customers/:customerId", () => {
    it("should update a customer", async () => {
      const updates: Partial<IUpdateCustomerParams> = {
        contact_number: "09987654321",
        visit_count: 100,
      };

      const response = await agent
        .put(`/customers/${testCustomerId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
      expect(response.body).toHaveProperty(
        "customer_contact_number",
        "09987654321",
      );
    });
  });

  describe("PUT /customers/:customerId/visit", () => {
    it("should increment customer visit count", async () => {
      const response = await agent
        .put(`/customers/${testCustomerId}/visit`)
        .expect(200);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
      expect(Number(response.body.customer_visit_count)).toBeGreaterThan(0);
    });
  });

  describe("DELETE /customers/:customerId", () => {
    it("should delete a customer", async () => {
      await agent.delete(`/customers/${testCustomerId}`).expect(200);
    });

    it("should return 404 for non-existent customer", async () => {
      await agent.delete("/customers/NON-EXISTENT").expect(404);
    });
  });
});
