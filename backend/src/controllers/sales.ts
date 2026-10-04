import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createSale,
  updateSale,
  deleteSale,
  type ICreateSaleParams,
} from "../queries/sales/sales.queries.js";
import {
  createSaleItem,
  getSaleItemsByTransactionId,
  updateSaleItem,
  deleteSaleItem,
  type ICreateSaleItemParams,
} from "../queries/sales/sales_item.queries.js";

type SaleItemInput = Omit<ICreateSaleItemParams, "transaction_id">;

// Item numbers are zero-padded sequence strings: "01", "02", ...
function formatItemNumber(sequence: number): string {
  return String(sequence).padStart(2, "0");
}

export default class SalesController {
  // Creates the sale header and its line items in one transaction
  public createSale = async (req: Request, res: Response): Promise<void> => {
    const { items, ...sale } = req.body as ICreateSaleParams & {
      items?: SaleItemInput[];
    };
    if (!Array.isArray(items) || items.length === 0) {
      res
        .status(400)
        .json({ error: "items must contain at least one sale item" });
      return;
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const [createdSale] = await createSale.run(sale, client);
      const createdItems = [];
      for (const [index, item] of items.entries()) {
        const [createdItem] = await createSaleItem.run(
          {
            ...item,
            transaction_id: sale.transaction_id,
            item_number: item.item_number ?? formatItemNumber(index + 1),
          },
          client,
        );
        createdItems.push(createdItem);
      }
      await client.query("COMMIT");
      res.status(201).json({ ...createdSale, items: createdItems });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getLatestSales = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSalesByTransactionId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId } = req.params;
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
        [{ column: "transaction_id", value: transactionId as string }],
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSalesByDateRange = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: "startDate and endDate are required" });
      return;
    }

    const client = await pool.connect();
    try {
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
        [
          {
            column: "transaction_date",
            value: startDate as string,
            operator: "gte",
          },
          {
            column: "transaction_date",
            value: endDate as string,
            operator: "lte",
          },
        ],
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSalesByCustomer = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { customerId } = req.params;
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
        [{ column: "customer_id", value: customerId as string }],
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSalesByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
        [{ column: "branch_id", value: branchId as string }],
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  // Returns sale headers that have at least one line item served by the barber
  public getSalesByBarber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
        [
          {
            raw: (barber) =>
              `transaction_id IN (SELECT transaction_id FROM bph_sales_item WHERE barber_id = ${barber})`,
            value: barberId as string,
          },
        ],
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSalesByPaymentMethod = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { paymentMethod } = req.params;
      const salesData = await runListQuery(
        client,
        listQueries.sales,
        req.query,
        [{ column: "payment_method", value: paymentMethod as string }],
      );
      res.json(salesData);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateSale = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId } = req.params;
      const [updatedSale] = await updateSale.run(
        { ...req.body, transaction_id: transactionId as string },
        client,
      );
      if (!updatedSale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      res.json(updatedSale);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  // Sale items are removed with the header (ON DELETE CASCADE)
  public deleteSale = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId } = req.params;
      const [deletedSale] = await deleteSale.run(
        { transaction_id: transactionId as string },
        client,
      );
      if (!deletedSale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSaleItems = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId } = req.params;
      const items = await getSaleItemsByTransactionId.run(
        { transaction_id: transactionId as string },
        client,
      );
      res.json(items);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  // item_number defaults to the next number in the transaction
  public createSaleItem = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId } = req.params;
      const item = req.body as SaleItemInput;
      let itemNumber = item.item_number;
      if (!itemNumber) {
        const existingItems = await getSaleItemsByTransactionId.run(
          { transaction_id: transactionId as string },
          client,
        );
        const lastSequence = Math.max(
          0,
          ...existingItems.map((existing) => Number(existing.item_number) || 0),
        );
        itemNumber = formatItemNumber(lastSequence + 1);
      }
      const [createdItem] = await createSaleItem.run(
        {
          ...item,
          transaction_id: transactionId as string,
          item_number: itemNumber,
        },
        client,
      );
      res.status(201).json(createdItem);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateSaleItem = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId, itemNumber } = req.params;
      const [updatedItem] = await updateSaleItem.run(
        {
          ...req.body,
          transaction_id: transactionId as string,
          item_number: itemNumber as string,
        },
        client,
      );
      if (!updatedItem) {
        res.status(404).json({ error: "Sale item not found" });
        return;
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public deleteSaleItem = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { transactionId, itemNumber } = req.params;
      const [deletedItem] = await deleteSaleItem.run(
        {
          transaction_id: transactionId as string,
          item_number: itemNumber as string,
        },
        client,
      );
      if (!deletedItem) {
        res.status(404).json({ error: "Sale item not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };
}
