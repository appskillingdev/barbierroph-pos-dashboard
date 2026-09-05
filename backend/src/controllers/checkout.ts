import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
      const checkouts = await getAllCheckouts.run(undefined, client);
      res.json(checkouts);
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
      const checkouts = await getCheckoutsByBranch.run(
        { assigned_branch: branchId as string },
        client,
      );
      res.json(checkouts);
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
      const checkouts = await getCheckoutsByBarber.run(
        { assigned_barber: barberId as string },
        client,
      );
      res.json(checkouts);
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
      const checkouts = await getCheckoutsByDateRange.run(
        {
          start_date: startDate as string,
          end_date: endDate as string,
        },
        client,
      );
      res.json(checkouts);
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
      const checkouts = await getCheckoutsByCustomerName.run(
        { customer_name: `%${name}%` },
        client,
      );
      res.json(checkouts);
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
    } finally {
      client.release();
    }
  };
}
