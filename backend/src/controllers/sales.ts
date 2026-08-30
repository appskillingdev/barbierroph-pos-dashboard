import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
      const salesData = await getLatestSales.run(undefined, client);
      res.json(salesData);
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
      const salesData = await getSalesByTransactionId.run(
        { transaction_id: transactionId as string },
        client,
      );
      res.json(salesData);
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
      const salesData = await getSalesByDateRange.run(
        { start_date: startDate as string, end_date: endDate as string },
        client,
      );
      res.json(salesData);
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
      const salesData = await getSalesByCustomer.run(
        { customer_id: customerId as string },
        client,
      );
      res.json(salesData);
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
      const salesData = await getSalesByBranch.run(
        { branch_id: branchId as string },
        client,
      );
      res.json(salesData);
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
      const salesData = await getSalesByBarber.run(
        { barber_id: barberId as string },
        client,
      );
      res.json(salesData);
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
      const salesData = await getSalesByPaymentMethod.run(
        { payment_method: paymentMethod as string },
        client,
      );
      res.json(salesData);
    } finally {
      client.release();
    }
  };

  public updateSale = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await updateSale.run(req.body, client);
      res.json(result);
    } finally {
      client.release();
    }
  };

  public deleteSale = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await deleteSale.run(req.body, client);
      res.status(204).send();
    } finally {
      client.release();
    }
  };
}
