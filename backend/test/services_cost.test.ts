import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type {
  ICreateServiceCostParams,
  ICreateServiceCostResult,
  IGetServiceCostByServiceCodeResult,
  IUpdateServiceCostParams,
} from "../src/queries/services/services_cost.queries.js";

import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";

type ServiceCostInput = Omit<ICreateServiceCostParams, "service_code">;

describe("Services Cost API", () => {
  // svc003 has no cost lines in the seed data
  const testServiceCode = "svc003";
  const testCostId = "prod003";
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    await pool.query(
      "DELETE FROM bph_services_cost WHERE service_code = $1 AND cost_id = $2",
      [testServiceCode, testCostId],
    );
    await pool.end();
  });

  describe("GET /services/:serviceCode/costs", () => {
    it("should get the cost breakdown of a service", async () => {
      const response = await agent.get("/services/svc002/costs").expect(200);
      const costs = response.body as IGetServiceCostByServiceCodeResult[];

      expect(costs.map((cost) => cost.item_number)).toEqual(["001", "002"]);
      expect(costs[0]).toHaveProperty("description", "Hair Gel 500ml");
      expect(costs[0]).toHaveProperty("minimum_qty");
      expect(costs[0]).toHaveProperty("cost_amount");
      expect(costs[0]).toHaveProperty("multiplier");
    });
  });

  describe("POST /services/:serviceCode/costs", () => {
    it("should create a service cost with the next item number", async () => {
      const newCost: ServiceCostInput = {
        cost_id: testCostId,
        multiplier: 2,
      };

      const response = await agent
        .post(`/services/${testServiceCode}/costs`)
        .send(newCost)
        .expect(201);
      const cost = response.body as ICreateServiceCostResult;

      expect(cost).toMatchObject({
        cost_category: "Product",
        cost_id: testCostId,
        item_number: "001",
        multiplier: 2,
        service_code: testServiceCode,
      });
    });

    it("should compute cost_amount and minimum_qty from the inventory", async () => {
      const response = await agent
        .get(`/services/${testServiceCode}/costs`)
        .expect(200);
      const [cost] = response.body as IGetServiceCostByServiceCodeResult[];

      // prod003: unit_cost 280, miniumum_stock 10; multiplier 2
      expect(Number(cost?.unit_cost)).toBe(280);
      expect(Number(cost?.cost_amount)).toBe(560);
      expect(Number(cost?.minimum_qty)).toBe(10);
    });

    it("should reject a cost_id that is not an inventory product", async () => {
      const newCost: ServiceCostInput = {
        cost_id: "NON-EXISTENT-PRODUCT",
        item_number: "099",
      };

      await agent
        .post(`/services/${testServiceCode}/costs`)
        .send(newCost)
        .expect(404);
    });
  });

  describe("GET /services/costs/product/:costId", () => {
    it("should get service costs that use a product", async () => {
      const response = await agent
        .get(`/services/costs/product/${testCostId}`)
        .expect(200);
      const costs = response.body as IGetServiceCostByServiceCodeResult[];

      expect(costs.map((cost) => cost.service_code)).toContain(testServiceCode);
    });
  });

  describe("PUT /services/:serviceCode/costs/:itemNumber/:costId", () => {
    it("should update the multiplier", async () => {
      const updates: Pick<IUpdateServiceCostParams, "multiplier"> = {
        multiplier: 3,
      };

      const response = await agent
        .put(`/services/${testServiceCode}/costs/001/${testCostId}`)
        .send(updates)
        .expect(200);
      const cost = response.body as ICreateServiceCostResult;

      expect(cost).toHaveProperty("multiplier", 3);
    });

    it("should return 404 for non-existent service cost", async () => {
      await agent
        .put(`/services/${testServiceCode}/costs/999/${testCostId}`)
        .send({ multiplier: 1 })
        .expect(404);
    });
  });

  describe("DELETE /services/:serviceCode/costs/:itemNumber/:costId", () => {
    it("should delete a service cost", async () => {
      await agent
        .delete(`/services/${testServiceCode}/costs/001/${testCostId}`)
        .expect(204);
    });

    it("should return 404 for non-existent service cost", async () => {
      await agent
        .delete(`/services/${testServiceCode}/costs/001/${testCostId}`)
        .expect(404);
    });
  });
});
