import { Router } from "express";
import SalesController from "../controllers/sales.js";

export function salesRoute(): Router {
  const router = Router();
  const controller = new SalesController();

  // Create sale
  router.post("/", controller.createSale);

  // Get all sales (latest first)
  router.get("/", controller.getLatestSales);

  // Get sales by date range
  router.get("/date-range", controller.getSalesByDateRange);

  // Get sales by customer
  router.get("/customer/:customerId", controller.getSalesByCustomer);

  // Get sales by branch
  router.get("/branch/:branchId", controller.getSalesByBranch);

  // Get sales by barber
  router.get("/barber/:barberId", controller.getSalesByBarber);

  // Get sales by payment method
  router.get(
    "/payment-method/:paymentMethod",
    controller.getSalesByPaymentMethod,
  );

  // Get sales by transaction ID
  router.get("/:transactionId", controller.getSalesByTransactionId);

  // Update sale
  router.put("/", controller.updateSale);

  // Delete sale
  router.delete("/", controller.deleteSale);

  return router;
}
