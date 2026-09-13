import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateBarberParams,
  IUpdateBarberParams,
} from "../src/queries/barbers/barbers.queries.js";

describe("Barbers API", () => {
  const testBarberId = `TEST-BARBER-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });
  afterAll(async () => {
    await pool.query("DELETE FROM bph_barbers WHERE barber_id = $1", [
      testBarberId,
    ]);
    await pool.end();
  });

  describe("POST /barbers", () => {
    it("should create a new barber", async () => {
      const newBarber: ICreateBarberParams = {
        barber_id: testBarberId,
        branch_id: "branch001",
        position: "Barber",
        full_name: "Test Barber",
        address: "123 Test St",
        commission: 0.6,
        email_address: "testbarber@barbierro.com",
      };

      const response = await agent.post("/barbers").send(newBarber).expect(201);

      expect(response.body).toHaveProperty("barber_id", testBarberId);
    });
  });

  describe("GET /barbers", () => {
    it("should get all barbers", async () => {
      const response = await agent.get("/barbers").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort barbers at the database level", async () => {
      const response = await agent
        .get(
          "/barbers?branch_id=branch001&sortBy=full_name&sortOrder=asc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /barbers/:barberId", () => {
    it("should get barber by ID", async () => {
      const response = await agent.get(`/barbers/${testBarberId}`).expect(200);

      expect(response.body).toHaveProperty("barber_id", testBarberId);
    });

    it("should return 404 for non-existent barber", async () => {
      await agent.get("/barbers/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /barbers/branch/:branchId", () => {
    it("should get barbers by branch", async () => {
      const response = await agent.get("/barbers/branch/branch001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /barbers/:barberId", () => {
    it("should update a barber", async () => {
      const updates: Partial<IUpdateBarberParams> = {
        address: "456 Updated St",
        commission: 0.65,
      };

      const response = await agent
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
      await agent.delete(`/barbers/${testBarberId}`).expect(200);
    });

    it("should return 404 for non-existent barber", async () => {
      await agent.delete("/barbers/NON-EXISTENT").expect(404);
    });
  });
});
