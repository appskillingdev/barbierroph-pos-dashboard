import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateQueueParams,
  IUpdateQueueParams,
  IUpdateQueueStatusParams,
} from "../src/queries/pos/queue.queries.js";

describe("Queue API", () => {
  let testQueueId: number;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

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
      const newQueue: ICreateQueueParams = {
        id: `TEST-QUEUE-${Date.now()}`,
        customer_name: "Test Customer",
        assigned_branch: "branch001",
        assigned_barber: "barber001",
        service_code: "REG-CUT",
        status: "waiting",
        appointment_date: "2024-01-15",
      };

      const response = await agent.post("/queue").send(newQueue).expect(201);

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
      const response = await agent.get("/queue").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort queue entries at the database level", async () => {
      const response = await agent
        .get(
          "/queue?status=waiting&sortBy=appointment_date&sortOrder=asc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /queue/:queueId", () => {
    it("should get queue entry by ID", async () => {
      const response = await agent.get(`/queue/${testQueueId}`).expect(200);

      expect(response.body).toHaveProperty("queue_id", testQueueId);
    });

    it("should return 404 for non-existent queue entry", async () => {
      await agent.get("/queue/999999").expect(404);
    });
  });

  describe("GET /queue/branch/:branchId", () => {
    it("should get queue entries by branch", async () => {
      const response = await agent.get("/queue/branch/branch001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /queue/status/:status", () => {
    it("should get queue entries by status", async () => {
      const response = await agent.get("/queue/status/waiting").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /queue/customer", () => {
    it("should get queue entries by customer name", async () => {
      const response = await agent.get("/queue/customer?name=Test").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /queue/:queueId", () => {
    it("should update a queue entry", async () => {
      const updates: Partial<IUpdateQueueParams> = {
        status: "in-service",
        appointment_date: "2024-01-15",
      };

      const response = await agent
        .put(`/queue/${testQueueId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("queue_id", testQueueId);
      expect(response.body).toHaveProperty("queue_status", "in-service");
    });
  });

  describe("PUT /queue/:queueId/status", () => {
    it("should update queue status", async () => {
      const statusUpdate: IUpdateQueueStatusParams = {
        status: "completed",
      };

      const response = await agent
        .put(`/queue/${testQueueId}/status`)
        .send(statusUpdate)
        .expect(200);

      expect(response.body).toHaveProperty("queue_id", testQueueId);
      expect(response.body).toHaveProperty("queue_status", "completed");
    });
  });

  describe("DELETE /queue/:queueId", () => {
    it("should delete a queue entry", async () => {
      await agent.delete(`/queue/${testQueueId}`).expect(200);
    });

    it("should return 404 for non-existent queue entry", async () => {
      await agent.delete("/queue/999999").expect(404);
    });
  });
});
