import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createBarber,
  getAllBarbers,
  getBarberById,
  getBarbersByBranch,
  getBarbersByPosition,
  updateBarber,
  deleteBarber,
} from "../queries/barbers/barbers.queries.js";

export default class BarbersController {
  public createBarber = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createBarber.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllBarbers = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const barbers = await runListQuery(
        client,
        listQueries.barbers,
        req.query,
      );
      res.json(barbers);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getBarberById = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const barber = await getBarberById.run(
        { barber_id: barberId as string },
        client,
      );
      res.json(barber);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getBarbersByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const barbers = await runListQuery(
        client,
        listQueries.barbers,
        req.query,
        [{ column: "branch_id", value: branchId as string }],
      );
      res.json(barbers);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getBarbersByPosition = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { position } = req.params;
      const barbers = await runListQuery(
        client,
        listQueries.barbers,
        req.query,
        [{ column: "position", value: position as string }],
      );
      res.json(barbers);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateBarber = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const result = await updateBarber.run(
        { ...req.body, barber_id: barberId as string },
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

  public deleteBarber = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      await deleteBarber.run({ barber_id: barberId as string }, client);
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
