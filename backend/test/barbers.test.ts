import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type {
  ICreateBarberParams,
  ICreateBarberResult,
  IGetBarberByIdResult,
  IGetBranchesByBarberResult,
  IUpdateBarberParams,
} from "../src/queries/barbers/barbers.queries.js";

import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";

describe("Barbers API", () => {
  const testBarberId = `TEST-BARBER-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });
  afterAll(async () => {
    // Branch assignments cascade with the barber
    await pool.query("DELETE FROM bph_barbers WHERE barber_id = $1", [
      testBarberId,
    ]);
    await pool.end();
  });

  describe("POST /barbers", () => {
    it("should create a new barber", async () => {
      const newBarber: ICreateBarberParams = {
        address: "123 Test St",
        barber_id: testBarberId,
        branch_id: "branch001",
        commission: 0.6,
        date_availability: "01, 02, 03",
        email_address: "testbarber@barbierro.com",
        full_name: "Test Barber",
        position: "Barber",
      };

      const response = await agent.post("/barbers").send(newBarber).expect(201);
      const barber = response.body as ICreateBarberResult;

      expect(barber).toHaveProperty("barber_id", testBarberId);
      expect(barber).toHaveProperty("date_availability", "01, 02, 03");
    });
  });

  describe("GET /barbers", () => {
    it("should get all barbers", async () => {
      const response = await agent.get("/barbers").expect(200);
      const barbers = response.body as ICreateBarberResult[];

      expect(Array.isArray(barbers)).toBe(true);
      expect(barbers.length).toBeGreaterThan(0);
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
    it("should get barber by ID with its branches", async () => {
      const response = await agent.get(`/barbers/${testBarberId}`).expect(200);
      const barber = response.body as IGetBarberByIdResult;

      expect(barber).toHaveProperty("barber_id", testBarberId);
      expect(barber.branch_ids).toEqual(["branch001"]);
    });

    it("should return 404 for non-existent barber", async () => {
      await agent.get("/barbers/NON-EXISTENT").expect(404);
    });
  });

  describe("Barber branches", () => {
    it("should assign a barber to another branch", async () => {
      await agent
        .post(`/barbers/${testBarberId}/branches`)
        .send({ branch_id: "branch002" })
        .expect(201);
    });

    it("should not duplicate an existing assignment", async () => {
      await agent
        .post(`/barbers/${testBarberId}/branches`)
        .send({ branch_id: "branch002" })
        .expect(200);
    });

    it("should list the branches of a barber", async () => {
      const response = await agent
        .get(`/barbers/${testBarberId}/branches`)
        .expect(200);
      const branches = response.body as IGetBranchesByBarberResult[];

      expect(branches.map((branch) => branch.branch_id)).toEqual([
        "branch001",
        "branch002",
      ]);
    });

    it("should unassign a barber from a branch", async () => {
      await agent
        .delete(`/barbers/${testBarberId}/branches/branch002`)
        .expect(204);
    });

    it("should return 404 when the barber is not assigned", async () => {
      await agent
        .delete(`/barbers/${testBarberId}/branches/branch002`)
        .expect(404);
    });
  });

  describe("GET /barbers/branch/:branchId", () => {
    it("should get barbers assigned to a branch", async () => {
      const response = await agent.get("/barbers/branch/branch001").expect(200);
      const barbers = response.body as ICreateBarberResult[];

      expect(barbers.map((barber) => barber.barber_id)).toContain(testBarberId);
    });
  });

  describe("PUT /barbers/:barberId", () => {
    it("should update a barber", async () => {
      const updates: Omit<IUpdateBarberParams, "barber_id"> = {
        address: "456 Updated St",
        branch_id: "branch001",
        commission: 0.65,
        date_availability: "04, 05",
        email_address: "testbarber@barbierro.com",
        full_name: "Test Barber",
        position: "Barber",
      };

      const response = await agent
        .put(`/barbers/${testBarberId}`)
        .send(updates)
        .expect(200);
      const barber = response.body as ICreateBarberResult;

      expect(barber).toHaveProperty("barber_id", testBarberId);
      expect(barber).toHaveProperty("address", "456 Updated St");
      expect(barber).toHaveProperty("date_availability", "04, 05");
    });

    it("should return 404 for non-existent barber", async () => {
      await agent
        .put("/barbers/NON-EXISTENT")
        .send({ full_name: "Nobody" })
        .expect(404);
    });
  });

  describe("DELETE /barbers/:barberId", () => {
    it("should delete a barber", async () => {
      await agent.delete(`/barbers/${testBarberId}`).expect(204);
    });

    it("should return 404 for non-existent barber", async () => {
      await agent.delete("/barbers/NON-EXISTENT").expect(404);
    });
  });
});
