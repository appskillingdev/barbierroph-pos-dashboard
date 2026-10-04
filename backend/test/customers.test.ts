import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type {
  ICreateCustomerParams,
  ICreateCustomerResult,
  IUpdateCustomerParams,
} from "../src/queries/customers/customers.queries.js";

import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";

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
        company: "AppSkilling",
        contact_number: "09123456789",
        customer_address: "123 Test St",
        customer_id: testCustomerId,
        customer_name: "Test Customer",
        email_address: "testcustomer@email.com",
        visit_count: 0,
      };

      const response = await agent
        .post("/customers")
        .send(newCustomer)
        .expect(201);
      const customer = response.body as ICreateCustomerResult;

      expect(customer).toHaveProperty("customer_id", testCustomerId);
      expect(customer).toHaveProperty("company", "AppSkilling");
    });
  });

  describe("GET /customers", () => {
    it("should get all customers", async () => {
      const response = await agent.get("/customers").expect(200);
      const customers = response.body as ICreateCustomerResult[];

      expect(Array.isArray(customers)).toBe(true);
      expect(customers.length).toBeGreaterThan(0);
    });

    it("should filter and sort customers at the database level", async () => {
      const response = await agent
        .get(
          "/customers?customer_name.contains=Test&sortBy=visit_count&sortOrder=desc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should filter customers by company", async () => {
      const response = await agent
        .get("/customers?company=AppSkilling")
        .expect(200);
      const customers = response.body as ICreateCustomerResult[];

      expect(customers.map((customer) => customer.customer_id)).toContain(
        testCustomerId,
      );
    });
  });

  describe("GET /customers/:customerId", () => {
    it("should get customer by ID", async () => {
      const response = await agent
        .get(`/customers/${testCustomerId}`)
        .expect(200);
      const customer = response.body as ICreateCustomerResult;

      expect(customer).toHaveProperty("customer_id", testCustomerId);
      expect(customer).toHaveProperty("company", "AppSkilling");
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
      const updates: Omit<IUpdateCustomerParams, "customer_id"> = {
        company: "Barbierro PH",
        contact_number: "09987654321",
        customer_address: "123 Test St",
        customer_name: "Test Customer",
        email_address: "testcustomer@email.com",
        visit_count: 100,
      };

      const response = await agent
        .put(`/customers/${testCustomerId}`)
        .send(updates)
        .expect(200);
      const customer = response.body as ICreateCustomerResult;

      expect(customer).toHaveProperty("customer_id", testCustomerId);
      expect(customer).toHaveProperty("contact_number", "09987654321");
      expect(customer).toHaveProperty("company", "Barbierro PH");
    });

    it("should return 404 for non-existent customer", async () => {
      await agent
        .put("/customers/NON-EXISTENT")
        .send({ customer_name: "Nobody" })
        .expect(404);
    });
  });

  describe("PATCH /customers/:customerId/visit", () => {
    it("should increment customer visit count", async () => {
      const response = await agent
        .patch(`/customers/${testCustomerId}/visit`)
        .expect(200);
      const customer = response.body as ICreateCustomerResult;

      expect(customer).toHaveProperty("customer_id", testCustomerId);
      expect(customer.visit_count).toBe(101);
    });
  });

  describe("DELETE /customers/:customerId", () => {
    it("should delete a customer", async () => {
      await agent.delete(`/customers/${testCustomerId}`).expect(204);
    });

    it("should return 404 for non-existent customer", async () => {
      await agent.delete("/customers/NON-EXISTENT").expect(404);
    });
  });
});
