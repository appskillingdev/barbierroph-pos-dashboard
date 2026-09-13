import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  getBranchesByOwner,
  getBranchesByLocation,
  updateBranch,
  deleteBranch,
} from "../queries/branches/branches.queries.js";

export default class BranchesController {
  public createBranch = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createBranch.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllBranches = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const branches = await runListQuery(
        client,
        listQueries.branches,
        req.query,
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

  public getBranchById = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const branch = await getBranchById.run(
        { branch_id: branchId as string },
        client,
      );
      res.json(branch);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getBranchesByOwner = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { ownerId } = req.params;
      const branches = await runListQuery(
        client,
        listQueries.branches,
        req.query,
        [{ column: "branch_owner", value: ownerId as string }],
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

  public getBranchesByLocation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { location } = req.params;
      const branches = await runListQuery(
        client,
        listQueries.branches,
        req.query,
        [{ column: "branch_location", value: location as string }],
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

  public updateBranch = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const result = await updateBranch.run(
        { ...req.body, branch_id: branchId as string },
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

  public deleteBranch = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      await deleteBranch.run({ branch_id: branchId as string }, client);
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
