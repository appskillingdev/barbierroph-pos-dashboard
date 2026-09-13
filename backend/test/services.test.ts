import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateServiceParams,
  IUpdateServiceParams,
} from "../src/queries/services/services.queries.js";

describe("Services API", () => {
  const testServiceCode = `TEST-SVC-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM bph_services WHERE service_code = $1", [
      testServiceCode,
    ]);
    await pool.end();
  });

  describe("POST /services", () => {
    it("should create a new service", async () => {
      const newService: ICreateServiceParams = {
        service_code: testServiceCode,
        service_name: "Test Service",
        category: "haircut",
        service_description: "Test service description",
        service_amount: 200.0,
        is_promo: false,
      };

      const response = await agent
        .post("/services")
        .send(newService)
        .expect(201);

      expect(response.body).toHaveProperty("service_code", testServiceCode);
      expect(response.body).toHaveProperty("service_price", "200");
    });
  });

  describe("GET /services", () => {
    it("should get all services", async () => {
      const response = await agent.get("/services").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort services at the database level", async () => {
      const response = await agent
        .get(
          "/services?service_name.contains=Test&sortBy=service_amount&sortOrder=asc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /services/:serviceCode", () => {
    it("should get service by code", async () => {
      const response = await agent
        .get(`/services/${testServiceCode}`)
        .expect(200);

      expect(response.body).toHaveProperty("service_code", testServiceCode);
    });

    it("should return 404 for non-existent service", async () => {
      await agent.get("/services/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /services/category/:category", () => {
    it("should get services by category", async () => {
      const response = await agent
        .get("/services/category/haircut")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /services/promos", () => {
    it("should get promo services", async () => {
      const response = await agent.get("/services/promos").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /services/:serviceCode", () => {
    it("should update a service", async () => {
      const updates: Partial<IUpdateServiceParams> = {
        service_amount: 250.0,
        is_promo: true,
      };

      const response = await agent
        .put(`/services/${testServiceCode}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("service_code", testServiceCode);
      expect(response.body).toHaveProperty("service_price", "250");
    });
  });

  describe("DELETE /services/:serviceCode", () => {
    it("should delete a service", async () => {
      await agent.delete(`/services/${testServiceCode}`).expect(200);
    });

    it("should return 404 for non-existent service", async () => {
      await agent.delete("/services/NON-EXISTENT").expect(404);
    });
  });
});
