import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import {
  createServiceCost,
  getServiceCostByServiceCode,
  getServiceCostByCostId,
  updateServiceCost,
  deleteServiceCost,
  type ICreateServiceCostParams,
} from "../queries/services/services_cost.queries.js";

// Service cost item numbers follow the "001", "002", ... format
function formatItemNumber(sequence: number): string {
  return String(sequence).padStart(3, "0");
}

export default class ServicesCostController {
  public getServiceCosts = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode } = req.params;
      const costs = await getServiceCostByServiceCode.run(
        { service_code: serviceCode as string },
        client,
      );
      res.json(costs);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getServiceCostsByProduct = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { costId } = req.params;
      const costs = await getServiceCostByCostId.run(
        { cost_id: costId as string },
        client,
      );
      res.json(costs);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  // cost_id must be a bph_inventory product; item_number defaults to the next number
  public createServiceCost = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode } = req.params;
      const cost = req.body as Omit<ICreateServiceCostParams, "service_code">;
      let itemNumber = cost.item_number;
      if (!itemNumber) {
        const existingCosts = await getServiceCostByServiceCode.run(
          { service_code: serviceCode as string },
          client,
        );
        const lastSequence = Math.max(
          0,
          ...existingCosts.map((existing) => Number(existing.item_number) || 0),
        );
        itemNumber = formatItemNumber(lastSequence + 1);
      }
      const [createdCost] = await createServiceCost.run(
        {
          ...cost,
          service_code: serviceCode as string,
          item_number: itemNumber,
        },
        client,
      );
      res.status(201).json(createdCost);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateServiceCost = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode, itemNumber, costId } = req.params;
      const [updatedCost] = await updateServiceCost.run(
        {
          ...req.body,
          service_code: serviceCode as string,
          item_number: itemNumber as string,
          cost_id: costId as string,
        },
        client,
      );
      if (!updatedCost) {
        res.status(404).json({ error: "Service cost not found" });
        return;
      }
      res.json(updatedCost);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public deleteServiceCost = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { serviceCode, itemNumber, costId } = req.params;
      const [deletedCost] = await deleteServiceCost.run(
        {
          service_code: serviceCode as string,
          item_number: itemNumber as string,
          cost_id: costId as string,
        },
        client,
      );
      if (!deletedCost) {
        res.status(404).json({ error: "Service cost not found" });
        return;
      }
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
