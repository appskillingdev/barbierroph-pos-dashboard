import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
      const customers = await getAllCustomers.run(undefined, client);
      res.json(customers);
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
      const customers = await getCustomersByName.run(
        { customer_name: `%${name}%` },
        client,
      );
      res.json(customers);
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
      const limit = parseInt(req.query.limit as string) || 10;
      const customers = await getTopCustomers.run({ limit }, client);
      res.json(customers);
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
    } finally {
      client.release();
    }
  };
}
