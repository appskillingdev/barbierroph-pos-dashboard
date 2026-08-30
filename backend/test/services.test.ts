import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Services API", () => {
  const testServiceCode = `TEST-SVC-${Date.now()}`;

  afterAll(async () => {
    await pool.query("DELETE FROM bph_services WHERE service_code = $1", [
      testServiceCode,
    ]);
    await pool.end();
  });

  describe("POST /services", () => {
    it("should create a new service", async () => {
      const newService = {
        serviceCode: testServiceCode,
        serviceName: "Test Service",
        serviceCategory: "haircut",
        serviceDescription: "Test service description",
        servicePrice: 200.0,
        servicePromo: 0,
        servicePromoPrice: 0,
        serviceValidity: "ACTIVE",
      };

      const response = await request(app)
        .post("/services")
        .send(newService)
        .expect(201);

      expect(response.body).toHaveProperty("service_code", testServiceCode);
      expect(response.body).toHaveProperty("service_price", "200");
    });
  });

  describe("GET /services", () => {
    it("should get all services", async () => {
      const response = await request(app).get("/services").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /services/:serviceCode", () => {
    it("should get service by code", async () => {
      const response = await request(app)
        .get(`/services/${testServiceCode}`)
        .expect(200);

      expect(response.body).toHaveProperty("service_code", testServiceCode);
    });

    it("should return 404 for non-existent service", async () => {
      await request(app).get("/services/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /services/category/:category", () => {
    it("should get services by category", async () => {
      const response = await request(app)
        .get("/services/category/haircut")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /services/promos", () => {
    it("should get promo services", async () => {
      const response = await request(app).get("/services/promos").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /services/:serviceCode", () => {
    it("should update a service", async () => {
      const updates = {
        servicePrice: 250.0,
        servicePromo: 1,
        servicePromoPrice: 200.0,
      };

      const response = await request(app)
        .put(`/services/${testServiceCode}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("service_code", testServiceCode);
      expect(response.body).toHaveProperty("service_price", "250");
    });
  });

  describe("DELETE /services/:serviceCode", () => {
    it("should delete a service", async () => {
      await request(app).delete(`/services/${testServiceCode}`).expect(200);
    });

    it("should return 404 for non-existent service", async () => {
      await request(app).delete("/services/NON-EXISTENT").expect(404);
    });
  });
});
