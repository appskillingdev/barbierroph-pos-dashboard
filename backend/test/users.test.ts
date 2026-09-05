import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Users API", () => {
  const testUserId = `TEST-USER-${Date.now()}`;

  afterAll(async () => {
    await pool.query('DELETE FROM bph_users WHERE "ID" = $1', [testUserId]);
    await pool.end();
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = {
        ID: testUserId,
        firstName: "Test",
        lastName: "User",
        role: "staff",
        gender: "M",
        email: "testuser@barbierro.com",
        contactNumber: "09123456789",
        password: "password123",
        address: "123 Test St",
        city: "Manila",
        province: "NCR",
        region: "NCR",
        birthdate: "1990-01-01",
        status: "ACTIVE",
      };

      const response = await request(app)
        .post("/users")
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty("ID", testUserId);
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      const response = await request(app).get("/users").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by ID", async () => {
      const response = await request(app)
        .get(`/users/${testUserId}`)
        .expect(200);

      expect(response.body).toHaveProperty("ID", testUserId);
    });

    it("should return 404 for non-existent user", async () => {
      await request(app).get("/users/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /users/role/:role", () => {
    it("should get users by role", async () => {
      const response = await request(app).get("/users/role/staff").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user", async () => {
      const updates = {
        contactNumber: "09987654321",
        email: "updated@barbierro.com",
      };

      const response = await request(app)
        .put(`/users/${testUserId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("ID", testUserId);
      expect(response.body).toHaveProperty("contact_number", "09987654321");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      await request(app).delete(`/users/${testUserId}`).expect(200);
    });

    it("should return 404 for non-existent user", async () => {
      await request(app).delete("/users/NON-EXISTENT").expect(404);
    });
  });
});
