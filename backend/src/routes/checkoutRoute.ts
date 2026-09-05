import { Router } from "express";
import CheckoutController from "../controllers/checkout.js";

export function checkoutRoute(): Router {
  const router = Router();
  const controller = new CheckoutController();

  // Create checkout
  router.post("/", controller.createCheckout);

  // Get all checkouts
  router.get("/", controller.getAllCheckouts);

  // Get checkouts by date range
  router.get("/date-range", controller.getCheckoutsByDateRange);

  // Get checkouts by branch
  router.get("/branch/:branchId", controller.getCheckoutsByBranch);

  // Get checkouts by barber
  router.get("/barber/:barberId", controller.getCheckoutsByBarber);

  // Get checkouts by customer name
  router.get("/customer/:name", controller.getCheckoutsByCustomerName);

  // Get checkout by ID
  router.get("/:id", controller.getCheckoutById);

  // Update checkout
  router.put("/:id", controller.updateCheckout);

  // Delete checkout
  router.delete("/:id", controller.deleteCheckout);

  return router;
}
