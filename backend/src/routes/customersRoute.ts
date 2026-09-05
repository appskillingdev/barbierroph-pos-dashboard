import { Router } from "express";
import CustomersController from "../controllers/customers.js";

export function customersRoute(): Router {
  const router = Router();
  const controller = new CustomersController();

  // Create customer
  router.post("/", controller.createCustomer);

  // Get all customers
  router.get("/", controller.getAllCustomers);

  // Get top customers
  router.get("/top", controller.getTopCustomers);

  // Get customers by name
  router.get("/name/:name", controller.getCustomersByName);

  // Get customer by ID
  router.get("/:customerId", controller.getCustomerById);

  // Update customer
  router.put("/:customerId", controller.updateCustomer);

  // Increment customer visit count
  router.patch("/:customerId/visit", controller.incrementCustomerVisitCount);

  // Delete customer
  router.delete("/:customerId", controller.deleteCustomer);

  return router;
}
