import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
      const services = await getAllServices.run(undefined, client);
      res.json(services);
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
      const services = await getServicesByCategory.run(
        { category: category as string },
        client,
      );
      res.json(services);
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
      const services = await getPromoServices.run(undefined, client);
      res.json(services);
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
    } finally {
      client.release();
    }
  };
}
