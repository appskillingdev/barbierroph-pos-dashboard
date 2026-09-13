import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createService,
  getAllServices,
  getServiceByCode,
  getServicesByCategory,
  getPromoServices,
  updateService,
  deleteService,
} from "../queries/services/services.queries.js";

export default class ServicesController {
  public createService = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createService.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllServices = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const services = await runListQuery(
        client,
        listQueries.services,
        req.query,
      );
      res.json(services);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getServiceByCode = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode } = req.params;
      const service = await getServiceByCode.run(
        { service_code: serviceCode as string },
        client,
      );
      res.json(service);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getServicesByCategory = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { category } = req.params;
      const services = await runListQuery(
        client,
        listQueries.services,
        req.query,
        [{ column: "category", value: category as string }],
      );
      res.json(services);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getPromoServices = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const services = await runListQuery(
        client,
        listQueries.services,
        req.query,
        [{ column: "is_promo", value: true as unknown as string }],
      );
      res.json(services);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateService = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode } = req.params;
      const result = await updateService.run(
        { ...req.body, service_code: serviceCode as string },
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

  public deleteService = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode } = req.params;
      await deleteService.run({ service_code: serviceCode as string }, client);
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
