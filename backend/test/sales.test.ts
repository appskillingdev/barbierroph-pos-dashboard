import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type {
  ICreateSaleParams,
  ICreateSaleResult,
  IUpdateSaleParams,
} from "../src/queries/sales/sales.queries.js";
import type {
  ICreateSaleItemParams,
  ICreateSaleItemResult,
  IUpdateSaleItemParams,
} from "../src/queries/sales/sales_item.queries.js";

import { pool } from "../src/database/client.js";
import { createAuthenticatedAgent } from "./helpers/authenticatedAgent.js";

type SaleItemInput = Omit<ICreateSaleItemParams, "transaction_id">;
type SaleResponse = ICreateSaleResult & { items: ICreateSaleItemResult[] };

describe("Sales API", () => {
  const testTransactionId = `TEST-TXN-${Date.now()}`;
  const tempTransactionId = `TEMP-TXN-${Date.now()}`;
  const rollbackTransactionId = `ROLLBACK-TXN-${Date.now()}`;
  let agent: Awaited<ReturnType<typeof createAuthenticatedAgent>>;

  const saleHeader = (transactionId: string): ICreateSaleParams => ({
    branch_id: "branch001",
    count_1: 0,
    count_5: 0,
    count_10: 0,
    count_20: 0,
    count_50: 1,
    count_100: 2,
    count_200: 0,
    count_500: 0,
    count_1000: 0,
    created_by: "owner001",
    customer_id: "cust001",
    payment_method: "pm001",
    reference_no: "REF-TEST-001",
    remarks: "Haircut + beard trim",
    total_amount: 250.0,
    transaction_date: "2024-01-15",
    transaction_id: transactionId,
  });

  beforeAll(async () => {
    agent = await createAuthenticatedAgent(true);
  });

  afterAll(async () => {
    // Clean up test data (sale items cascade with the header)
    await pool.query(
      "DELETE FROM bph_sales WHERE transaction_id = ANY($1::text[])",
      [[testTransactionId, tempTransactionId, rollbackTransactionId]],
    );
    await pool.end();
  });

  describe("POST /sales", () => {
    it("should create a sale with its items", async () => {
      const items: SaleItemInput[] = [
        { amount: 150.0, barber_id: "barber001", service_code: "svc001" },
        // amount omitted: defaults to the service amount of svc003 (100)
        { barber_id: "barber002", service_code: "svc003" },
      ];

      const response = await agent
        .post("/sales")
        .send({ ...saleHeader(testTransactionId), items })
        .expect(201);
      const sale = response.body as SaleResponse;

      expect(sale).toHaveProperty("transaction_id", testTransactionId);
      expect(Number(sale.total_amount)).toBe(250);
      expect(sale).toHaveProperty("remarks", "Haircut + beard trim");
      expect(sale).not.toHaveProperty("barber_id");
      expect(sale).not.toHaveProperty("service_code");
      expect(sale.items).toHaveLength(2);
      expect(sale.items[0]).toMatchObject({
        barber_id: "barber001",
        item_number: "01",
        service_code: "svc001",
        transaction_id: testTransactionId,
      });
      expect(sale.items[1]).toMatchObject({
        barber_id: "barber002",
        item_number: "02",
        service_code: "svc003",
      });
      expect(Number(sale.items[1]?.amount)).toBe(100);
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteSale: Partial<ICreateSaleParams> = {
        transaction_date: "2024-01-15",
        transaction_id: "INCOMPLETE-TXN",
      };

      await agent.post("/sales").send(incompleteSale).expect(400);
    });

    it("should not keep the sale when an item fails", async () => {
      const items: SaleItemInput[] = [
        { barber_id: "barber001", service_code: "NON-EXISTENT-SVC" },
      ];

      await agent
        .post("/sales")
        .send({ ...saleHeader(rollbackTransactionId), items })
        .expect(404);

      const { rowCount } = await pool.query(
        "SELECT 1 FROM bph_sales WHERE transaction_id = $1",
        [rollbackTransactionId],
      );
      expect(rowCount).toBe(0);
    });
  });

  describe("GET /sales", () => {
    it("should get all sales", async () => {
      const response = await agent.get("/sales").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter and sort sales at the database level", async () => {
      const response = await agent
        .get(
          "/sales?payment_method=pm001&sortBy=transaction_date&sortOrder=desc&limit=10",
        )
        .expect(200);

      const sales = response.body as ICreateSaleResult[];

      expect(Array.isArray(sales)).toBe(true);
      expect(sales.every((sale) => sale.payment_method === "pm001")).toBe(true);
    });

    it("should get latest sales with limit", async () => {
      const response = await agent.get("/sales?limit=5").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /sales/:transactionId", () => {
    it("should get sales by transaction ID", async () => {
      const response = await agent
        .get(`/sales/${testTransactionId}`)
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty(
        "transaction_id",
        testTransactionId,
      );
    });
  });

  describe("GET /sales/date-range", () => {
    it("should get sales by date range", async () => {
      const response = await agent
        .get("/sales/date-range?startDate=2024-01-01&endDate=2024-12-31")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 400 for missing date parameters", async () => {
      await agent.get("/sales/date-range").expect(400);
    });
  });

  describe("GET /sales/customer/:customerId", () => {
    it("should get sales by customer", async () => {
      const response = await agent.get("/sales/customer/cust001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/branch/:branchId", () => {
    it("should get sales by branch", async () => {
      const response = await agent.get("/sales/branch/branch001").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /sales/barber/:barberId", () => {
    it("should get sales that have an item served by the barber", async () => {
      const response = await agent.get("/sales/barber/barber002").expect(200);

      const sales = response.body as ICreateSaleResult[];
      const transactionIds = sales.map((sale) => sale.transaction_id);

      expect(transactionIds).toContain(testTransactionId);
      expect(new Set(transactionIds).size).toBe(transactionIds.length);
    });
  });

  describe("GET /sales/payment-method/:paymentMethod", () => {
    it("should get sales by payment method", async () => {
      const response = await agent
        .get("/sales/payment-method/pm001")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("Sale items", () => {
    it("should list items of a transaction", async () => {
      const response = await agent
        .get(`/sales/${testTransactionId}/items`)
        .expect(200);

      const items = response.body as ICreateSaleItemResult[];

      expect(items.map((item) => item.item_number)).toEqual(["01", "02"]);
    });

    it("should add an item with the next item number", async () => {
      const newItem: SaleItemInput = {
        barber_id: "barber001",
        service_code: "svc002",
      };

      const response = await agent
        .post(`/sales/${testTransactionId}/items`)
        .send(newItem)
        .expect(201);
      const item = response.body as ICreateSaleItemResult;

      expect(item).toMatchObject({
        item_number: "03",
        service_code: "svc002",
        transaction_id: testTransactionId,
      });
      expect(Number(item.amount)).toBe(250);
    });

    it("should update an item", async () => {
      const updates: Omit<
        IUpdateSaleItemParams,
        "item_number" | "transaction_id"
      > = {
        amount: 275.0,
        barber_id: "barber002",
        service_code: "svc002",
      };

      const response = await agent
        .put(`/sales/${testTransactionId}/items/03`)
        .send(updates)
        .expect(200);
      const item = response.body as ICreateSaleItemResult;

      expect(item).toHaveProperty("barber_id", "barber002");
      expect(Number(item.amount)).toBe(275);
    });

    it("should delete an item", async () => {
      await agent.delete(`/sales/${testTransactionId}/items/03`).expect(204);

      const response = await agent
        .get(`/sales/${testTransactionId}/items`)
        .expect(200);
      expect(response.body).toHaveLength(2);
    });

    it("should return 404 for non-existent item", async () => {
      await agent.delete(`/sales/${testTransactionId}/items/99`).expect(404);
    });
  });

  describe("PUT /sales/:transactionId", () => {
    it("should update a sale", async () => {
      const updates: Omit<IUpdateSaleParams, "transaction_id"> = {
        created_by: "owner001",
        payment_method: "pm002",
        reference_no: "GCASH-TEST-001",
        remarks: "Updated by cashier",
        total_amount: 175.0,
      };

      const response = await agent
        .put(`/sales/${testTransactionId}`)
        .send(updates)
        .expect(200);
      const sale = response.body as ICreateSaleResult;

      expect(sale).toHaveProperty("transaction_id", testTransactionId);
      expect(Number(sale.total_amount)).toBe(175);
      expect(sale).toHaveProperty("remarks", "Updated by cashier");
    });

    it("should return 404 for non-existent transaction ID", async () => {
      await agent
        .put("/sales/NON-EXISTENT-TXN")
        .send({
          payment_method: "pm001",
          total_amount: 100,
        } satisfies Omit<IUpdateSaleParams, "transaction_id">)
        .expect(404);
    });
  });

  describe("DELETE /sales/:transactionId", () => {
    it("should delete a sale and its items", async () => {
      // Create a temporary sale for deletion
      await agent
        .post("/sales")
        .send({
          ...saleHeader(tempTransactionId),
          items: [{ barber_id: "barber001", service_code: "svc001" }],
        })
        .expect(201);

      await agent.delete(`/sales/${tempTransactionId}`).expect(204);

      const { rowCount } = await pool.query(
        "SELECT 1 FROM bph_sales_item WHERE transaction_id = $1",
        [tempTransactionId],
      );
      expect(rowCount).toBe(0);
    });

    it("should return 404 for non-existent transaction ID", async () => {
      await agent.delete("/sales/NON-EXISTENT-TXN").expect(404);
    });
  });
});
