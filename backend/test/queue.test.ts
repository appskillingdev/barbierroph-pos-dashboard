import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Queue API", () => {
  let testQueueId: number;

  afterAll(async () => {
    if (testQueueId) {
      await pool.query("DELETE FROM pos_queue WHERE queue_id = $1", [
        testQueueId,
      ]);
    }
    await pool.end();
  });

  describe("POST /queue", () => {
    it("should create a new queue entry", async () => {
      const newQueue = {
        queueCustomerName: "Test Customer",
        queueBranchId: "branch001",
        queueBarberId: "barber001",
        queueServiceCode: "REG-CUT",
        queueStatus: "waiting",
        queueTimestamp: "2024-01-15T10:00:00",
      };

      const response = await request(app)
        .post("/queue")
        .send(newQueue)
        .expect(201);

      testQueueId = response.body.queue_id;
      expect(response.body).toHaveProperty("queue_id");
      expect(response.body).toHaveProperty(
        "queue_customer_name",
        "Test Customer",
      );
    });
  });

  describe("GET /queue", () => {
    it("should get all queue entries", async () => {
      const response = await request(app).get("/queue").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /queue/:queueId", () => {
    it("should get queue entry by ID", async () => {
      const response = await request(app)
        .get(`/queue/${testQueueId}`)
        .expect(200);

      expect(response.body).toHaveProperty("queue_id", testQueueId);
    });

    it("should return 404 for non-existent queue entry", async () => {
      await request(app).get("/queue/999999").expect(404);
    });
  });

  describe("GET /queue/branch/:branchId", () => {
    it("should get queue entries by branch", async () => {
      const response = await request(app)
        .get("/queue/branch/branch001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /queue/status/:status", () => {
    it("should get queue entries by status", async () => {
      const response = await request(app)
        .get("/queue/status/waiting")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /queue/customer", () => {
    it("should get queue entries by customer name", async () => {
      const response = await request(app)
        .get("/queue/customer?name=Test")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /queue/:queueId", () => {
    it("should update a queue entry", async () => {
      const updates = {
        queueStatus: "in-service",
        queueStartTime: "2024-01-15T10:05:00",
      };

      const response = await request(app)
        .put(`/queue/${testQueueId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("queue_id", testQueueId);
      expect(response.body).toHaveProperty("queue_status", "in-service");
    });
  });

  describe("PUT /queue/:queueId/status", () => {
    it("should update queue status", async () => {
      const statusUpdate = {
        status: "completed",
      };

      const response = await request(app)
        .put(`/queue/${testQueueId}/status`)
        .send(statusUpdate)
        .expect(200);

      expect(response.body).toHaveProperty("queue_id", testQueueId);
      expect(response.body).toHaveProperty("queue_status", "completed");
    });
  });

  describe("DELETE /queue/:queueId", () => {
    it("should delete a queue entry", async () => {
      await request(app).delete(`/queue/${testQueueId}`).expect(200);
    });

    it("should return 404 for non-existent queue entry", async () => {
      await request(app).delete("/queue/999999").expect(404);
    });
  });
});
