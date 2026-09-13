import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";
import type {
  ICreateInventoryItemParams,
  IUpdateInventoryItemParams,
  IUpdateInventoryStockParams,
} from "../src/queries/inventory/inventory.queries.js";

describe("Inventory API", () => {
  const testProductCode = `TEST-PROD-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM bph_inventory WHERE product_code = $1", [
      testProductCode,
    ]);
    await pool.end();
  });

  describe("POST /inventory", () => {
    it("should create a new inventory item", async () => {
      const newItem: ICreateInventoryItemParams = {
        product_id: testProductCode,
        product_name: "Test Product",
        category: "CAT-001",
        initial_stock: 50,
        unit_cost: 100.0,
      };

      const response = await agent.post("/inventory").send(newItem).expect(201);

      expect(response.body).toHaveProperty("product_code", testProductCode);
    });
  });

  describe("GET /inventory", () => {
    it("should get all inventory items", async () => {
      const response = await agent.get("/inventory").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort inventory at the database level", async () => {
      const response = await agent
        .get(
          "/inventory?category=CAT-001&sortBy=product_name&sortOrder=asc&limit=10",
        )
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /inventory/:productCode", () => {
    it("should get inventory item by code", async () => {
      const response = await agent
        .get(`/inventory/${testProductCode}`)
        .expect(200);

      expect(response.body).toHaveProperty("product_code", testProductCode);
    });

    it("should return 404 for non-existent item", async () => {
      await agent.get("/inventory/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /inventory/category/:categoryCode", () => {
    it("should get inventory by category", async () => {
      const response = await agent
        .get("/inventory/category/CAT-001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /inventory/low-stock", () => {
    it("should get low stock items", async () => {
      const response = await agent
        .get("/inventory/low-stock?threshold=10")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /inventory/:productCode", () => {
    it("should update an inventory item", async () => {
      const updates: Partial<IUpdateInventoryItemParams> = {
        initial_stock: 75,
        unit_cost: 120.0,
      };

      const response = await agent
        .put(`/inventory/${testProductCode}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("product_code", testProductCode);
      expect(response.body).toHaveProperty("product_quantity", 75);
    });
  });

  describe("PUT /inventory/:productCode/stock", () => {
    it("should update inventory stock", async () => {
      const stockUpdate: IUpdateInventoryStockParams = {
        initial_stock: 70,
      };

      const response = await agent
        .put(`/inventory/${testProductCode}/stock`)
        .send(stockUpdate)
        .expect(200);

      expect(response.body).toHaveProperty("product_code", testProductCode);
    });
  });

  describe("DELETE /inventory/:productCode", () => {
    it("should delete an inventory item", async () => {
      await agent.delete(`/inventory/${testProductCode}`).expect(200);
    });

    it("should return 404 for non-existent item", async () => {
      await agent.delete("/inventory/NON-EXISTENT").expect(404);
    });
  });
});
