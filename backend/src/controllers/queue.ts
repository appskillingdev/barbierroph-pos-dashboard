import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createQueue,
  getAllQueues,
  getQueueById,
  getQueuesByBranch,
  getQueuesByBarber,
  getQueuesByStatus,
  getQueuesByCustomerName,
  updateQueue,
  updateQueueStatus,
  deleteQueue,
} from "../queries/pos/queue.queries.js";

export default class QueueController {
  public createQueue = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createQueue.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllQueues = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const queues = await runListQuery(client, listQueries.queue, req.query);
      res.json(queues);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getQueueById = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const queue = await getQueueById.run({ id: id as string }, client);
      res.json(queue);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getQueuesByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { branchId } = req.params;
      const queues = await runListQuery(client, listQueries.queue, req.query, [
        { column: "assigned_branch", value: branchId as string },
      ]);
      res.json(queues);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getQueuesByBarber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { barberId } = req.params;
      const queues = await runListQuery(client, listQueries.queue, req.query, [
        { column: "assigned_barber", value: barberId as string },
      ]);
      res.json(queues);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getQueuesByStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { status } = req.params;
      const queues = await runListQuery(client, listQueries.queue, req.query, [
        { column: "status", value: status as string },
      ]);
      res.json(queues);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getQueuesByCustomerName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { name } = req.params;
      const queues = await runListQuery(client, listQueries.queue, req.query, [
        {
          column: "customer_name",
          value: name as string,
          operator: "contains",
        },
      ]);
      res.json(queues);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateQueue = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateQueue.run(
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

  public updateQueueStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateQueueStatus.run(
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

  public deleteQueue = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      await deleteQueue.run({ id: id as string }, client);
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
