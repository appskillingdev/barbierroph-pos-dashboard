import { Router } from "express";
import ServicesController from "../controllers/services.js";
import { requirePermission } from "../controllers/helper/authorizationHandler.js";

export function servicesRoute(): Router {
  const router = Router();
  const controller = new ServicesController();

  // Create service - Only P01 can CUD services
  router.post(
    "/",
    requirePermission("canCUDServices"),
    controller.createService,
  );

  // Get all services - All authenticated users can view
  router.get("/", controller.getAllServices);

  // Get promo services - All authenticated users can view
  router.get("/promos", controller.getPromoServices);

  // Get services by category - All authenticated users can view
  router.get("/category/:category", controller.getServicesByCategory);

  // Get service by code - All authenticated users can view
  router.get("/:serviceCode", controller.getServiceByCode);

  // Update service - Only P01 can CUD services
  router.put(
    "/:serviceCode",
    requirePermission("canCUDServices"),
    controller.updateService,
  );

  // Delete service - Only P01 can CUD services
  router.delete(
    "/:serviceCode",
    requirePermission("canCUDServices"),
    controller.deleteService,
  );

  return router;
}
