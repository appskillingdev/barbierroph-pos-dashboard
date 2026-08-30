import { Router } from "express";
import PaymentMethodsController from "../controllers/paymentmethods.js";

export function paymentMethodsRoute(): Router {
  const router = Router();
  const controller = new PaymentMethodsController();

  // Create payment method
  router.post("/", controller.createPaymentMethod);

  // Get all payment methods
  router.get("/", controller.getAllPaymentMethods);

  // Get payment method by name
  router.get("/name/:name", controller.getPaymentMethodByName);

  // Get payment method by ID
  router.get("/:paymentMethodId", controller.getPaymentMethodById);

  // Update payment method
  router.put("/:paymentMethodId", controller.updatePaymentMethod);

  // Delete payment method
  router.delete("/:paymentMethodId", controller.deletePaymentMethod);

  return router;
}
