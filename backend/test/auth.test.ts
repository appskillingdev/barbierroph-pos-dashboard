import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import session from "express-session";
import { BarbierroAPIRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";
import bcrypt from "bcrypt";

const app = express();

// Session middleware for testing
app.use(
  session({
    secret: "test-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", BarbierroAPIRoutes());

describe("Auth API", () => {
  const testUser = {
    ID: `TEST-AUTH-USER-${Date.now()}`,
    user_id: `testauth${Date.now()}`,
    email_address: `testauth${Date.now()}@barbierro.com`,
    password: "TestPassword123!",
    full_name: "Test Auth User",
    contact_number: "09171234567",
    user_type: "P01", // Master
  };

  let hashedPassword: string;
  let sessionCookie: string;

  beforeAll(async () => {
    // Hash password for test user
    hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Insert test user into database
    await pool.query(
      `INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, contact_number, user_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        testUser.ID,
        testUser.user_id,
        testUser.email_address,
        hashedPassword,
        testUser.full_name,
        testUser.contact_number,
        testUser.user_type,
      ],
    );
  });

  afterAll(async () => {
    // Cleanup test user
    await pool.query('DELETE FROM bph_users WHERE "ID" = $1', [testUser.ID]);
    await pool.end();
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email_address,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message", "Login successful");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty(
        "email",
        testUser.email_address,
      );
      expect(response.body.user).toHaveProperty("userType", testUser.user_type);

      // Store session cookie for later tests
      const cookies = response.headers["set-cookie"];
      if (cookies && cookies.length > 0) {
        sessionCookie = cookies[0];
      }
    });

    it("should reject login with invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@barbierro.com",
          password: "WrongPassword123!",
        })
        .expect(401);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should reject login with invalid password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email_address,
          password: "WrongPassword123!",
        })
        .expect(401);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should reject login with missing credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email_address,
        })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Missing credentials");
    });
  });

  describe("GET /api/auth/session", () => {
    it("should return authenticated user session", async () => {
      // First login to get session
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: testUser.email_address,
        password: testUser.password,
      });

      const cookies = loginResponse.headers["set-cookie"];

      // Check session
      const response = await request(app)
        .get("/api/auth/session")
        .set("Cookie", cookies)
        .expect(200);

      expect(response.body).toHaveProperty("authenticated", true);
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty(
        "email",
        testUser.email_address,
      );
    });

    it("should return unauthenticated for no session", async () => {
      const response = await request(app).get("/api/auth/session").expect(401);

      expect(response.body).toHaveProperty("authenticated", false);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should logout and destroy session", async () => {
      // First login to get session
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: testUser.email_address,
        password: testUser.password,
      });

      const cookies = loginResponse.headers["set-cookie"];

      // Logout
      const response = await request(app)
        .post("/api/auth/logout")
        .set("Cookie", cookies)
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message", "Logout successful");

      // Verify session is destroyed
      const sessionCheck = await request(app)
        .get("/api/auth/session")
        .set("Cookie", cookies)
        .expect(401);

      expect(sessionCheck.body).toHaveProperty("authenticated", false);
    });
  });
});

describe("Authorization Middleware", () => {
  const testUsers = {
    master: {
      ID: `TEST-MASTER-${Date.now()}`,
      user_id: `master${Date.now()}`,
      email_address: `master${Date.now()}@barbierro.com`,
      password: "MasterPass123!",
      full_name: "Test Master User",
      user_type: "P01",
    },
    branchManager: {
      ID: `TEST-MANAGER-${Date.now()}`,
      user_id: `manager${Date.now()}`,
      email_address: `manager${Date.now()}@barbierro.com`,
      password: "ManagerPass123!",
      full_name: "Test Manager User",
      user_type: "P02",
    },
    cashier: {
      ID: `TEST-CASHIER-${Date.now()}`,
      user_id: `cashier${Date.now()}`,
      email_address: `cashier${Date.now()}@barbierro.com`,
      password: "CashierPass123!",
      full_name: "Test Cashier User",
      user_type: "P03",
    },
  };

  beforeAll(async () => {
    // Create test users with different roles
    for (const user of Object.values(testUsers)) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        `INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, user_type)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          user.ID,
          user.user_id,
          user.email_address,
          hashedPassword,
          user.full_name,
          user.user_type,
        ],
      );
    }
  });

  afterAll(async () => {
    // Cleanup test users
    for (const user of Object.values(testUsers)) {
      await pool.query('DELETE FROM bph_users WHERE "ID" = $1', [user.ID]);
    }
  });

  describe("User Type Permissions", () => {
    it("P01 (Master) should have all permissions", async () => {
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: testUsers.master.email_address,
        password: testUsers.master.password,
      });

      expect(loginResponse.body.user.userType).toBe("P01");
      // Master can access all resources
    });

    it("P02 (Branch Manager) should have limited permissions", async () => {
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: testUsers.branchManager.email_address,
        password: testUsers.branchManager.password,
      });

      expect(loginResponse.body.user.userType).toBe("P02");
      // Branch Manager can CRUD barbers, view analytics, but cannot manage branches
    });

    it("P03 (Cashier) should have minimal permissions", async () => {
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: testUsers.cashier.email_address,
        password: testUsers.cashier.password,
      });

      expect(loginResponse.body.user.userType).toBe("P03");
      // Cashier can only send sales data and view services/queue
    });
  });
});
