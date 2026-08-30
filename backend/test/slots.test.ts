import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Slots API", () => {
  let testSlotId: number;

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
      const newSlot = {
        slotBranchId: "branch001",
        slotBarberId: "barber001",
        slotDate: "2024-01-20",
        slotStartTime: "10:00:00",
        slotEndTime: "11:00:00",
        slotStatus: "available",
        slotMaxCapacity: 1,
        slotCurrentBookings: 0,
      };

      const response = await request(app)
        .post("/slots")
        .send(newSlot)
        .expect(201);

      testSlotId = response.body.slot_id;
      expect(response.body).toHaveProperty("slot_id");
      expect(response.body).toHaveProperty("slot_branch_id", "branch001");
    });
  });

  describe("GET /slots", () => {
    it("should get all slots", async () => {
      const response = await request(app).get("/slots").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /slots/:slotId", () => {
    it("should get slot by ID", async () => {
      const response = await request(app)
        .get(`/slots/${testSlotId}`)
        .expect(200);

      expect(response.body).toHaveProperty("slot_id", testSlotId);
    });

    it("should return 404 for non-existent slot", async () => {
      await request(app).get("/slots/999999").expect(404);
    });
  });

  describe("GET /slots/branch/:branchId", () => {
    it("should get slots by branch", async () => {
      const response = await request(app)
        .get("/slots/branch/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/barber/:barberId", () => {
    it("should get slots by barber", async () => {
      const response = await request(app)
        .get("/slots/barber/barber001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/available/:branchId", () => {
    it("should get available slots by branch", async () => {
      const response = await request(app)
        .get("/slots/available/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /slots/date-range", () => {
    it("should get slots by date range", async () => {
      const response = await request(app)
        .get("/slots/date-range?startDate=2024-01-01&endDate=2024-01-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await request(app).get("/slots/date-range").expect(400);
    });
  });

  describe("PUT /slots/:slotId", () => {
    it("should update a slot", async () => {
      const updates = {
        slotStatus: "booked",
        slotCurrentBookings: 1,
      };

      const response = await request(app)
        .put(`/slots/${testSlotId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("slot_id", testSlotId);
      expect(response.body).toHaveProperty("slot_status", "booked");
    });
  });

  describe("DELETE /slots/:slotId", () => {
    it("should delete a slot", async () => {
      await request(app).delete(`/slots/${testSlotId}`).expect(200);
    });

    it("should return 404 for non-existent slot", async () => {
      await request(app).delete("/slots/999999").expect(404);
    });
  });
});
