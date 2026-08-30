import type { Request, Response } from "express";
import { pool } from "../database/client.js";
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
      const items = await getAllInventoryItems.run(undefined, client);
      res.json(items);
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
      const items = await getInventoryItemsByCategory.run(
        { category: category as string },
        client,
      );
      res.json(items);
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
      const items = await getLowStockItems.run(undefined, client);
      res.json(items);
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
    } finally {
      client.release();
    }
  };
}
