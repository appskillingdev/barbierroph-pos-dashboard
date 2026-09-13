import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateBranchParams,
  IUpdateBranchParams,
} from "../src/queries/branches/branches.queries.js";

describe("Branches API", () => {
  const testBranchId = `TEST-BRANCH-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM bph_branches WHERE branch_id = $1", [
      testBranchId,
    ]);
    await pool.end();
  });

  describe("POST /branches", () => {
    it("should create a new branch", async () => {
      const newBranch: ICreateBranchParams = {
        branch_id: testBranchId,
        branch_owner: "owner001",
        established_at: "2024-01-01",
        branch_location: "Manila",
        branch_address: "123 Test St",
      };

      const response = await agent
        .post("/branches")
        .send(newBranch)
        .expect(201);

      expect(response.body).toHaveProperty("branch_id", testBranchId);
    });
  });

  describe("GET /branches", () => {
    it("should get all branches", async () => {
      const response = await agent.get("/branches").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort branches at the database level", async () => {
      const response = await agent
        .get(
          "/branches?branch_location=Manila&sortBy=branch_address&sortOrder=asc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /branches/:branchId", () => {
    it("should get branch by ID", async () => {
      const response = await agent.get(`/branches/${testBranchId}`).expect(200);

      expect(response.body).toHaveProperty("branch_id", testBranchId);
    });

    it("should return 404 for non-existent branch", async () => {
      await agent.get("/branches/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /branches/owner/:ownerId", () => {
    it("should get branches by owner", async () => {
      const response = await agent.get("/branches/owner/owner001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /branches/location", () => {
    it("should get branches by location", async () => {
      const response = await agent
        .get("/branches/location?city=Manila&province=NCR")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /branches/:branchId", () => {
    it("should update a branch", async () => {
      const updates: Partial<IUpdateBranchParams> = {
        branch_address: "456 Updated St",
        branch_location: "Quezon City",
      };

      const response = await agent
        .put(`/branches/${testBranchId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("branch_id", testBranchId);
      expect(response.body).toHaveProperty(
        "branch_contact_number",
        "09987654321",
      );
    });
  });

  describe("DELETE /branches/:branchId", () => {
    it("should delete a branch", async () => {
      await agent.delete(`/branches/${testBranchId}`).expect(200);
    });

    it("should return 404 for non-existent branch", async () => {
      await agent.delete("/branches/NON-EXISTENT").expect(404);
    });
  });
});
