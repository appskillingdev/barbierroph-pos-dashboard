import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createSlot,
  getAllSlots,
  getSlotById,
  getSlotsByBranch,
  getSlotsByBarber,
  getSlotsByStatus,
  getAvailableSlotsByBranch,
  updateSlot,
  updateSlotStatus,
  deleteSlot,
} from "../queries/pos/slots.queries.js";

export default class SlotsController {
  public createSlot = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createSlot.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllSlots = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const slots = await runListQuery(client, listQueries.slots, req.query);
      res.json(slots);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSlotById = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const slot = await getSlotById.run({ id: id as string }, client);
      res.json(slot);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSlotsByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const slots = await runListQuery(client, listQueries.slots, req.query, [
        { column: "branch_id", value: branchId as string },
      ]);
      res.json(slots);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSlotsByBarber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const slots = await runListQuery(client, listQueries.slots, req.query, [
        { column: "assigned_barber", value: barberId as string },
      ]);
      res.json(slots);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getSlotsByStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { status } = req.params;
      const slots = await runListQuery(client, listQueries.slots, req.query, [
        { column: "status", value: status as string },
      ]);
      res.json(slots);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAvailableSlotsByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const slots = await runListQuery(client, listQueries.slots, req.query, [
        { column: "branch_id", value: branchId as string },
        { column: "status", value: "available" },
      ]);
      res.json(slots);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateSlot = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateSlot.run(
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

  public updateSlotStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateSlotStatus.run(
        { id: id as string, status: req.body.status },
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

  public deleteSlot = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      await deleteSlot.run({ id: id as string }, client);
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
