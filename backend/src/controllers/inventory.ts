import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { listQueries } from "./helper/listQueryDefinitions.js";
import { runListQuery } from "./helper/sqlQueryHandler.js";
import {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  getInventoryItemsByCategory,
  getLowStockItems,
  updateInventoryItem,
  updateInventoryStock,
  deleteInventoryItem,
} from "../queries/inventory/inventory.queries.js";

export default class InventoryController {
  public createInventoryItem = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const result = await createInventoryItem.run(req.body, client);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getAllInventoryItems = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const items = await runListQuery(
        client,
        listQueries.inventory,
        req.query,
      );
      res.json(items);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getInventoryItemById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { productId } = req.params;
      const item = await getInventoryItemById.run(
        { product_id: productId as string },
        client,
      );
      res.json(item);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getInventoryItemsByCategory = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { category } = req.params;
      const items = await runListQuery(
        client,
        listQueries.inventory,
        req.query,
        [{ column: "category", value: category as string }],
      );
      res.json(items);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public getLowStockItems = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const items = await runListQuery(
        client,
        listQueries.inventory,
        req.query,
        [{ raw: "initial_stock <= miniumum_stock" }],
      );
      res.json(items);
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      client.release();
    }
  };

  public updateInventoryItem = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { productId } = req.params;
      const result = await updateInventoryItem.run(
        { ...req.body, product_id: productId as string },
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

  public updateInventoryStock = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { productId } = req.params;
      const result = await updateInventoryStock.run(
        {
          product_id: productId as string,
          initial_stock: req.body.initial_stock,
        },
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

  public deleteInventoryItem = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      const { productId } = req.params;
      await deleteInventoryItem.run(
        { product_id: productId as string },
        client,
      );
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
