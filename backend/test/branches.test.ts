import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Branches API", () => {
  const testBranchId = `TEST-BRANCH-${Date.now()}`;

  afterAll(async () => {
    await pool.query("DELETE FROM bph_branches WHERE branch_id = $1", [
      testBranchId,
    ]);
    await pool.end();
  });

  describe("POST /branches", () => {
    it("should create a new branch", async () => {
      const newBranch = {
        branchId: testBranchId,
        branchName: "Test Branch",
        branchAddress: "123 Test St",
        branchCity: "Manila",
        branchProvince: "NCR",
        branchRegion: "NCR",
        branchContactNumber: "09123456789",
        branchEmail: "testbranch@barbierro.com",
        branchOwner: "owner001",
        branchDescription: "Test branch",
        branchValidity: "ACTIVE",
      };

      const response = await request(app)
        .post("/branches")
        .send(newBranch)
        .expect(201);

      expect(response.body).toHaveProperty("branch_id", testBranchId);
    });
  });

  describe("GET /branches", () => {
    it("should get all branches", async () => {
      const response = await request(app).get("/branches").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /branches/:branchId", () => {
    it("should get branch by ID", async () => {
      const response = await request(app)
        .get(`/branches/${testBranchId}`)
        .expect(200);

      expect(response.body).toHaveProperty("branch_id", testBranchId);
    });

    it("should return 404 for non-existent branch", async () => {
      await request(app).get("/branches/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /branches/owner/:ownerId", () => {
    it("should get branches by owner", async () => {
      const response = await request(app)
        .get("/branches/owner/owner001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /branches/location", () => {
    it("should get branches by location", async () => {
      const response = await request(app)
        .get("/branches/location?city=Manila&province=NCR")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /branches/:branchId", () => {
    it("should update a branch", async () => {
      const updates = {
        branchContactNumber: "09987654321",
        branchDescription: "Updated test branch",
      };

      const response = await request(app)
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
      await request(app).delete(`/branches/${testBranchId}`).expect(200);
    });

    it("should return 404 for non-existent branch", async () => {
      await request(app).delete("/branches/NON-EXISTENT").expect(404);
    });
  });
});
