import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createBarber,
  getBarberById,
  updateBarber,
  deleteBarber,
  assignBarberToBranch,
  unassignBarberFromBranch,
  getBranchesByBarber,
  type ICreateBarberParams,
} from "../queries/barbers/barbers.queries.js";

export default class BarbersController {
  // branch_id (legacy single branch) is also recorded in bph_barber_branches
  public createBarber = async (req: Request, res: Response): Promise<void> => {
    const barber = req.body as ICreateBarberParams;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const [createdBarber] = await createBarber.run(barber, client);
      if (barber.branch_id) {
        await assignBarberToBranch.run(
          { barber_id: barber.barber_id, branch_id: barber.branch_id },
          client,
        );
      }
      await client.query("COMMIT");
      res.status(201).json(createdBarber);
    } catch (error) {
      await client.query("ROLLBACK");
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
      const [barber] = await getBarberById.run(
        { barber_id: barberId as string },
        client,
      );
      if (!barber) {
        res.status(404).json({ error: "Barber not found" });
        return;
      }
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
        [
          {
            raw: (branch) =>
              `barber_id IN (SELECT barber_id FROM bph_barber_branches WHERE branch_id = ${branch})`,
            value: branchId as string,
          },
        ],
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
      await client.query("BEGIN");
      const [updatedBarber] = await updateBarber.run(
        { ...req.body, barber_id: barberId as string },
        client,
      );
      if (!updatedBarber) {
        await client.query("ROLLBACK");
        res.status(404).json({ error: "Barber not found" });
        return;
      }
      if (updatedBarber.branch_id) {
        await assignBarberToBranch.run(
          {
            barber_id: updatedBarber.barber_id,
            branch_id: updatedBarber.branch_id,
          },
          client,
        );
      }
      await client.query("COMMIT");
      res.json(updatedBarber);
    } catch (error) {
      await client.query("ROLLBACK");
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
      const [deletedBarber] = await deleteBarber.run(
        { barber_id: barberId as string },
        client,
      );
      if (!deletedBarber) {
        res.status(404).json({ error: "Barber not found" });
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

  public getBarberBranches = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const branches = await getBranchesByBarber.run(
        { barber_id: barberId as string },
        client,
      );
      res.json(branches);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  // Returns 201 when newly assigned, 200 when the barber was already assigned
  public assignBarberToBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const { branch_id } = req.body as { branch_id?: string };
      const assignment = { barber_id: barberId as string, branch_id };
      const [created] = await assignBarberToBranch.run(assignment, client);
      res.status(created ? 201 : 200).json(created ?? assignment);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public unassignBarberFromBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId, branchId } = req.params;
      const [removed] = await unassignBarberFromBranch.run(
        { barber_id: barberId as string, branch_id: branchId as string },
        client,
      );
      if (!removed) {
        res.status(404).json({ error: "Barber is not assigned to branch" });
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
