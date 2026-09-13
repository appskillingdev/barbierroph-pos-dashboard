import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateSlotParams,
  IUpdateSlotParams,
} from "../src/queries/pos/slots.queries.js";

describe("Slots API", () => {
  let testSlotId: number;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    if (testSlotId) {
      await pool.query("DELETE FROM pos_slots WHERE slot_id = $1", [
        testSlotId,
      ]);
    }
    await pool.end();
  });

  describe("POST /slots", () => {
    it("should create a new slot", async () => {
      const newSlot: ICreateSlotParams = {
        id: `TEST-SLOT-${Date.now()}`,
        slot_id: `SLOT-${Date.now()}`,
        branch_id: "branch001",
        assigned_barber: "barber001",
        status: "available",
      };

      const response = await agent.post("/slots").send(newSlot).expect(201);

      testSlotId = response.body.slot_id;
      expect(response.body).toHaveProperty("slot_id");
      expect(response.body).toHaveProperty("slot_branch_id", "branch001");
    });
  });

  describe("GET /slots", () => {
    it("should get all slots", async () => {
      const response = await agent.get("/slots").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort slots at the database level", async () => {
      const response = await agent
        .get("/slots?status=available&sortBy=slot_id&sortOrder=asc&limit=10")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/:slotId", () => {
    it("should get slot by ID", async () => {
      const response = await agent.get(`/slots/${testSlotId}`).expect(200);

      expect(response.body).toHaveProperty("slot_id", testSlotId);
    });

    it("should return 404 for non-existent slot", async () => {
      await agent.get("/slots/999999").expect(404);
    });
  });

  describe("GET /slots/branch/:branchId", () => {
    it("should get slots by branch", async () => {
      const response = await agent.get("/slots/branch/branch001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/barber/:barberId", () => {
    it("should get slots by barber", async () => {
      const response = await agent.get("/slots/barber/barber001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/available/:branchId", () => {
    it("should get available slots by branch", async () => {
      const response = await agent
        .get("/slots/available/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/date-range", () => {
    it("should get slots by date range", async () => {
      const response = await agent
        .get("/slots/date-range?startDate=2024-01-01&endDate=2024-01-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await agent.get("/slots/date-range").expect(400);
    });
  });

  describe("PUT /slots/:slotId", () => {
    it("should update a slot", async () => {
      const updates: Partial<IUpdateSlotParams> = {
        status: "booked",
      };

      const response = await agent
        .put(`/slots/${testSlotId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("slot_id", testSlotId);
      expect(response.body).toHaveProperty("slot_status", "booked");
    });
  });

  describe("DELETE /slots/:slotId", () => {
    it("should delete a slot", async () => {
      await agent.delete(`/slots/${testSlotId}`).expect(200);
    });

    it("should return 404 for non-existent slot", async () => {
      await agent.delete("/slots/999999").expect(404);
    });
  });
});
