import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createSale,
  getLatestSales,
  getSalesByTransactionId,
  getSalesByDateRange,
  getSalesByCustomer,
  getSalesByBranch,
  getSalesByBarber,
  getSalesByPaymentMethod,
  updateSale,
  deleteSale,
} from "../queries/sales/sales.queries.js";

export default class SalesController {
  public createSale = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createSale.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
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
    const client = await pool.connect();
    try {
      const { startDate, endDate } = req.query;
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
        [{ column: "barber_id", value: barberId as string }],
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
      const result = await updateSale.run(req.body, client);
      res.json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public deleteSale = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await deleteSale.run(req.body, client);
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
