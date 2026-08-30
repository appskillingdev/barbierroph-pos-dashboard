import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
    } finally {
      client.release();
    }
  };

  public getAllSlots = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const slots = await getAllSlots.run(undefined, client);
      res.json(slots);
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
      const slots = await getSlotsByBranch.run(
        { branch_id: branchId as string },
        client,
      );
      res.json(slots);
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
      const slots = await getSlotsByBarber.run(
        { assigned_barber: barberId as string },
        client,
      );
      res.json(slots);
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
      const slots = await getSlotsByStatus.run(
        { status: status as string },
        client,
      );
      res.json(slots);
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
      const slots = await getAvailableSlotsByBranch.run(
        { branch_id: branchId as string },
        client,
      );
      res.json(slots);
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
    } finally {
      client.release();
    }
  };
}
