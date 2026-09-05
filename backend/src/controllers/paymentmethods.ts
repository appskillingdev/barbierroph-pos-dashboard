import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  getPaymentMethodByName,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../queries/paymentmethods/paymentmethods.queries.js";

export default class PaymentMethodsController {
  public createPaymentMethod = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createPaymentMethod.run(req.body, client);
      res.status(201).json(result);
    } finally {
      client.release();
    }
  };

  public getAllPaymentMethods = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const methods = await getAllPaymentMethods.run(undefined, client);
      res.json(methods);
    } finally {
      client.release();
    }
  };

  public getPaymentMethodById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { paymentMethodId } = req.params;
      const method = await getPaymentMethodById.run(
        { payment_method_id: paymentMethodId as string },
        client,
      );
      res.json(method);
    } finally {
      client.release();
    }
  };

  public getPaymentMethodByName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { name } = req.params;
      const method = await getPaymentMethodByName.run(
        { payment_method_name: name as string },
        client,
      );
      res.json(method);
    } finally {
      client.release();
    }
  };

  public updatePaymentMethod = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { paymentMethodId } = req.params;
      const result = await updatePaymentMethod.run(
        { ...req.body, payment_method_id: paymentMethodId as string },
        client,
      );
      res.json(result);
    } finally {
      client.release();
    }
  };

  public deletePaymentMethod = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { paymentMethodId } = req.params;
      await deletePaymentMethod.run(
        { payment_method_id: paymentMethodId as string },
        client,
      );
      res.status(204).send();
    } finally {
      client.release();
    }
  };
}
