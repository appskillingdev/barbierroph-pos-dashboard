import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createCheckout,
  getAllCheckouts,
  getCheckoutById,
  getCheckoutsByBranch,
  getCheckoutsByBarber,
  getCheckoutsByDateRange,
  getCheckoutsByCustomerName,
  updateCheckout,
  deleteCheckout,
} from "../queries/pos/checkout.queries.js";

export default class CheckoutController {
  public createCheckout = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createCheckout.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllCheckouts = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const checkouts = await runListQuery(
        client,
        listQueries.checkouts,
        req.query,
      );
      res.json(checkouts);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCheckoutById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const checkout = await getCheckoutById.run({ id: id as string }, client);
      res.json(checkout);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCheckoutsByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const checkouts = await runListQuery(
        client,
        listQueries.checkouts,
        req.query,
        [{ column: "assigned_branch", value: branchId as string }],
      );
      res.json(checkouts);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCheckoutsByBarber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const checkouts = await runListQuery(
        client,
        listQueries.checkouts,
        req.query,
        [{ column: "assigned_barber", value: barberId as string }],
      );
      res.json(checkouts);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCheckoutsByDateRange = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { startDate, endDate } = req.query;
      const checkouts = await runListQuery(
        client,
        listQueries.checkouts,
        req.query,
        [
          {
            column: "purchased_at",
            value: startDate as string,
            operator: "gte",
          },
          { column: "purchased_at", value: endDate as string, operator: "lte" },
        ],
      );
      res.json(checkouts);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCheckoutsByCustomerName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { name } = req.params;
      const checkouts = await runListQuery(
        client,
        listQueries.checkouts,
        req.query,
        [
          {
            column: "customer_name",
            value: name as string,
            operator: "contains",
          },
        ],
      );
      res.json(checkouts);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateCheckout = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateCheckout.run(
        { ...req.body, id: id as string },
        client,
      );
      res.json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public deleteCheckout = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      await deleteCheckout.run({ id: id as string }, client);
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
