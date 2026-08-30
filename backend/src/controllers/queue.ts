import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
    } finally {
      client.release();
    }
  };

  public getAllQueues = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const queues = await getAllQueues.run(undefined, client);
      res.json(queues);
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
      const queues = await getQueuesByBranch.run(
        { assigned_branch: branchId as string },
        client,
      );
      res.json(queues);
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
      const queues = await getQueuesByBarber.run(
        { assigned_barber: barberId as string },
        client,
      );
      res.json(queues);
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
      const queues = await getQueuesByStatus.run(
        { status: status as string },
        client,
      );
      res.json(queues);
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
      const queues = await getQueuesByCustomerName.run(
        { customer_name: `%${name as string}%` },
        client,
      );
      res.json(queues);
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
    } finally {
      client.release();
    }
  };
}
