import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Customers API", () => {
  const testCustomerId = `TEST-CUST-${Date.now()}`;

  afterAll(async () => {
    await pool.query("DELETE FROM bph_customers WHERE customer_id = $1", [
      testCustomerId,
    ]);
    await pool.end();
  });

  describe("POST /customers", () => {
    it("should create a new customer", async () => {
      const newCustomer = {
        customerId: testCustomerId,
        customerFirstName: "Test",
        customerLastName: "Customer",
        customerGender: "M",
        customerContactNumber: "09123456789",
        customerEmail: "testcustomer@email.com",
        customerAddress: "123 Test St",
        customerVisitCount: 0,
        customerLoyaltyPoints: 0,
        customerStatus: "ACTIVE",
      };

      const response = await request(app)
        .post("/customers")
        .send(newCustomer)
        .expect(201);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
    });
  });

  describe("GET /customers", () => {
    it("should get all customers", async () => {
      const response = await request(app).get("/customers").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /customers/:customerId", () => {
    it("should get customer by ID", async () => {
      const response = await request(app)
        .get(`/customers/${testCustomerId}`)
        .expect(200);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
    });

    it("should return 404 for non-existent customer", async () => {
      await request(app).get("/customers/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /customers/top", () => {
    it("should get top customers", async () => {
      const response = await request(app)
        .get("/customers/top?limit=10")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /customers/:customerId", () => {
    it("should update a customer", async () => {
      const updates = {
        customerContactNumber: "09987654321",
        customerLoyaltyPoints: 100,
      };

      const response = await request(app)
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
      const response = await request(app)
        .put(`/customers/${testCustomerId}/visit`)
        .expect(200);

      expect(response.body).toHaveProperty("customer_id", testCustomerId);
      expect(Number(response.body.customer_visit_count)).toBeGreaterThan(0);
    });
  });

  describe("DELETE /customers/:customerId", () => {
    it("should delete a customer", async () => {
      await request(app).delete(`/customers/${testCustomerId}`).expect(200);
    });

    it("should return 404 for non-existent customer", async () => {
      await request(app).delete("/customers/NON-EXISTENT").expect(404);
    });
  });
});
