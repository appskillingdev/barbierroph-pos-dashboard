import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
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
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
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
      const methods = await runListQuery(
        client,
        listQueries.paymentMethods,
        req.query,
      );
      res.json(methods);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
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
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
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
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
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
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
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
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };
}
