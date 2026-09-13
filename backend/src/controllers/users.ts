import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUserId,
  getUserByEmail,
  updateUser,
  updateUserPassword,
  deleteUser,
} from "../queries/users/users.queries.js";

export default class UsersController {
  public createUser = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createUser.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const users = await getAllUsers.run(undefined, client);
      res.json(users);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const user = await getUserById.run({ ID: id as string }, client);
      res.json(user);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getUserByUserId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { userId } = req.params;
      const user = await getUserByUserId.run(
        { user_id: userId as string },
        client,
      );
      res.json(user);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getUserByEmail = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { email } = req.params;
      const user = await getUserByEmail.run(
        { email_address: email as string },
        client,
      );
      res.json(user);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateUser.run(
        { ...req.body, ID: id as string },
        client,
      );
      res.status(200).send();
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateUserPassword = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const result = await updateUserPassword.run(
        { ID: id as string, password: req.body.password },
        client,
      );
      res.status(200).send();
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const users = await getUserById.run({ ID: id as string }, client);

      if (users.length === 0) {
        throw new Error("User not found");
      } else {
        await deleteUser.run({ ID: id as string }, client);
        res.status(201).send();
      }
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };
}
