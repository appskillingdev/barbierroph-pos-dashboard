import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Barbers API", () => {
  const testBarberId = `TEST-BARBER-${Date.now()}`;

  afterAll(async () => {
    await pool.query("DELETE FROM bph_barbers WHERE barber_id = $1", [
      testBarberId,
    ]);
    await pool.end();
  });

  describe("POST /barbers", () => {
    it("should create a new barber", async () => {
      const newBarber = {
        barberId: testBarberId,
        barberFirstName: "Test",
        barberLastName: "Barber",
        barberContactNumber: "09123456789",
        barberEmail: "testbarber@barbierro.com",
        branchId: "branch001",
        barberPayScheme: "commission",
        barberCommissionRate: 0.6,
        barberValidity: "ACTIVE",
      };

      const response = await request(app)
        .post("/barbers")
        .send(newBarber)
        .expect(201);

      expect(response.body).toHaveProperty("barber_id", testBarberId);
    });
  });

  describe("GET /barbers", () => {
    it("should get all barbers", async () => {
      const response = await request(app).get("/barbers").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /barbers/:barberId", () => {
    it("should get barber by ID", async () => {
      const response = await request(app)
        .get(`/barbers/${testBarberId}`)
        .expect(200);

      expect(response.body).toHaveProperty("barber_id", testBarberId);
    });

    it("should return 404 for non-existent barber", async () => {
      await request(app).get("/barbers/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /barbers/branch/:branchId", () => {
    it("should get barbers by branch", async () => {
      const response = await request(app)
        .get("/barbers/branch/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /barbers/:barberId", () => {
    it("should update a barber", async () => {
      const updates = {
        barberContactNumber: "09987654321",
        barberCommissionRate: 0.65,
      };

      const response = await request(app)
        .put(`/barbers/${testBarberId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("barber_id", testBarberId);
      expect(response.body).toHaveProperty(
        "barber_contact_number",
        "09987654321",
      );
    });
  });

  describe("DELETE /barbers/:barberId", () => {
    it("should delete a barber", async () => {
      await request(app).delete(`/barbers/${testBarberId}`).expect(200);
    });

    it("should return 404 for non-existent barber", async () => {
      await request(app).delete("/barbers/NON-EXISTENT").expect(404);
    });
  });
});
