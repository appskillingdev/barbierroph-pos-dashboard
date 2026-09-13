import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateUserParams,
  IUpdateUserParams,
} from "../src/queries/users/users.queries.js";

describe("Users API", () => {
  const testUserId = `TEST-USER-1789263348096`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query('DELETE FROM bph_users WHERE "ID" = $1', [testUserId]);
    await pool.end();
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser: ICreateUserParams = {
        ID: testUserId,
        full_name: "Test User",
        user_id: "testuser",
        email_address: "testuser@barbierro.com",
        contact_number: "09123456789",
        password: "password123",
        user_type: "P01",
      };

      const response = await agent.post("/users").send(newUser).expect(201);
      console.log(response);
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      const response = await agent.get("/users").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort users at the database level", async () => {
      const response = await agent
        .get("/users?user_type=P01&sortBy=created_at&sortOrder=desc&limit=10")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by ID", async () => {
      const response = await agent.get(`/users/${testUserId}`).expect(200);

      expect(response.body[0]).toHaveProperty("ID", testUserId);
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user", async () => {
      const updates: Partial<IUpdateUserParams> = {
        full_name: "Test User",
        user_id: "testuser",
        email_address: "testuser23@barbierro.com",
        contact_number: "09199990022",
        user_type: "P01",
      };

      await agent.put(`/users/${testUserId}`).send(updates).expect(200);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      await agent.delete(`/users/${testUserId}`).expect(201);
    });
  });
});
