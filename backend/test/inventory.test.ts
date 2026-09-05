import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { createRoutes } from "../src/apiRoutes.js";
import { pool } from "../src/database/client.js";

const app = express();
app.use(express.json());
createRoutes(app);

describe("Inventory API", () => {
  const testProductCode = `TEST-PROD-${Date.now()}`;

  afterAll(async () => {
    await pool.query("DELETE FROM bph_inventory WHERE product_code = $1", [
      testProductCode,
    ]);
    await pool.end();
  });

  describe("POST /inventory", () => {
    it("should create a new inventory item", async () => {
      const newItem = {
        productCode: testProductCode,
        productName: "Test Product",
        productBrand: "Test Brand",
        productDescription: "Test product description",
        productCategory: "CAT-001",
        productQuantity: 50,
        productUnit: "pcs",
        productCost: 100.0,
        productValidity: "ACTIVE",
      };

      const response = await request(app)
        .post("/inventory")
        .send(newItem)
        .expect(201);

      expect(response.body).toHaveProperty("product_code", testProductCode);
    });
  });

  describe("GET /inventory", () => {
    it("should get all inventory items", async () => {
      const response = await request(app).get("/inventory").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /inventory/:productCode", () => {
    it("should get inventory item by code", async () => {
      const response = await request(app)
        .get(`/inventory/${testProductCode}`)
        .expect(200);

      expect(response.body).toHaveProperty("product_code", testProductCode);
    });

    it("should return 404 for non-existent item", async () => {
      await request(app).get("/inventory/NON-EXISTENT").expect(404);
    });
  });

  describe("GET /inventory/category/:categoryCode", () => {
    it("should get inventory by category", async () => {
      const response = await request(app)
        .get("/inventory/category/CAT-001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /inventory/low-stock", () => {
    it("should get low stock items", async () => {
      const response = await request(app)
        .get("/inventory/low-stock?threshold=10")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /inventory/:productCode", () => {
    it("should update an inventory item", async () => {
      const updates = {
        productQuantity: 75,
        productCost: 120.0,
      };

      const response = await request(app)
        .put(`/inventory/${testProductCode}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty("product_code", testProductCode);
      expect(response.body).toHaveProperty("product_quantity", 75);
    });
  });

  describe("PUT /inventory/:productCode/stock", () => {
    it("should update inventory stock", async () => {
      const stockUpdate = {
        quantityChange: -5,
        actionType: "usage",
        notes: "Used for customer service",
      };

      const response = await request(app)
        .put(`/inventory/${testProductCode}/stock`)
        .send(stockUpdate)
        .expect(200);

      expect(response.body).toHaveProperty("product_code", testProductCode);
    });
  });

  describe("DELETE /inventory/:productCode", () => {
    it("should delete an inventory item", async () => {
      await request(app).delete(`/inventory/${testProductCode}`).expect(200);
    });

    it("should return 404 for non-existent item", async () => {
      await request(app).delete("/inventory/NON-EXISTENT").expect(404);
    });
  });
});
