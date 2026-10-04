import { Router } from "express";
import SalesController from "../controllers/sales.js";

export function salesRoute(): Router {
  const router = Router();
  const controller = new SalesController();

  // Create sale (header + items)
  router.post("/", controller.createSale);

  // Get all sales (latest first)
  router.get("/", controller.getLatestSales);

  // Get sales by date range
  router.get("/date-range", controller.getSalesByDateRange);

  // Get sales by customer
  router.get("/customer/:customerId", controller.getSalesByCustomer);

  // Get sales by branch
  router.get("/branch/:branchId", controller.getSalesByBranch);

  // Get sales by barber (through sale items)
  router.get("/barber/:barberId", controller.getSalesByBarber);

  // Get sales by payment method
  router.get(
    "/payment-method/:paymentMethod",
    controller.getSalesByPaymentMethod,
  );

  // Get sale items of a transaction
  router.get("/:transactionId/items", controller.getSaleItems);

  // Add sale item to a transaction
  router.post("/:transactionId/items", controller.createSaleItem);

  // Update sale item
  router.put("/:transactionId/items/:itemNumber", controller.updateSaleItem);

  // Delete sale item
  router.delete("/:transactionId/items/:itemNumber", controller.deleteSaleItem);

  // Get sales by transaction ID
  router.get("/:transactionId", controller.getSalesByTransactionId);

  // Update sale
  router.put("/:transactionId", controller.updateSale);

  // Delete sale (and its items)
  router.delete("/:transactionId", controller.deleteSale);

  return router;
}
