import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
    } finally {
      client.release();
    }
  };

  public getAllBarbers = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const barbers = await getAllBarbers.run(undefined, client);
      res.json(barbers);
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
      const barbers = await getBarbersByBranch.run(
        { branch_id: branchId as string },
        client,
      );
      res.json(barbers);
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
      const barbers = await getBarbersByPosition.run(
        { position: position as string },
        client,
      );
      res.json(barbers);
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
    } finally {
      client.release();
    }
  };
}
