import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomersByName,
  getTopCustomers,
  updateCustomer,
  incrementCustomerVisitCount,
  deleteCustomer,
} from "../queries/customers/customers.queries.js";

export default class CustomersController {
  public createCustomer = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createCustomer.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllCustomers = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const customers = await runListQuery(
        client,
        listQueries.customers,
        req.query,
      );
      res.json(customers);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCustomerById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { customerId } = req.params;
      const customer = await getCustomerById.run(
        { customer_id: customerId as string },
        client,
      );
      res.json(customer);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getCustomersByName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { name } = req.params;
      const customers = await runListQuery(
        client,
        listQueries.customers,
        req.query,
        [
          {
            column: "customer_name",
            value: name as string,
            operator: "contains",
          },
        ],
      );
      res.json(customers);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getTopCustomers = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const topQuery = {
        ...req.query,
        sortBy: req.query.sortBy ?? "visit_count",
        sortOrder: req.query.sortOrder ?? "desc",
        limit: req.query.limit ?? "10",
      };
      const customers = await runListQuery(
        client,
        listQueries.customers,
        topQuery,
        [],
      );
      res.json(customers);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateCustomer = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { customerId } = req.params;
      const result = await updateCustomer.run(
        { ...req.body, customer_id: customerId as string },
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

  public incrementCustomerVisitCount = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { customerId } = req.params;
      const result = await incrementCustomerVisitCount.run(
        { customer_id: customerId as string },
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

  public deleteCustomer = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { customerId } = req.params;
      await deleteCustomer.run({ customer_id: customerId as string }, client);
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
