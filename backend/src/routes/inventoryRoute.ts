import { Router } from "express";
import InventoryController from "../controllers/inventory.js";

export function inventoryRoute(): Router {
  const router = Router();
  const controller = new InventoryController();

  // Create inventory item
  router.post("/", controller.createInventoryItem);

  // Get all inventory items
  router.get("/", controller.getAllInventoryItems);

  // Get low stock items
  router.get("/low-stock", controller.getLowStockItems);

  // Get inventory items by category
  router.get("/category/:category", controller.getInventoryItemsByCategory);

  // Get inventory item by ID
  router.get("/:productId", controller.getInventoryItemById);

  // Update inventory item
  router.put("/:productId", controller.updateInventoryItem);

  // Update inventory stock
  router.patch("/:productId/stock", controller.updateInventoryStock);

  // Delete inventory item
  router.delete("/:productId", controller.deleteInventoryItem);

  return router;
}
