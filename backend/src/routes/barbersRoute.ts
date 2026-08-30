import { Router } from "express";
import BarbersController from "../controllers/barbers.js";

export function barbersRoute(): Router {
  const router = Router();
  const controller = new BarbersController();

  // Create barber
  router.post("/", controller.createBarber);

  // Get all barbers
  router.get("/", controller.getAllBarbers);

  // Get barbers by branch
  router.get("/branch/:branchId", controller.getBarbersByBranch);

  // Get barbers by position
  router.get("/position/:position", controller.getBarbersByPosition);

  // Get barber by ID
  router.get("/:barberId", controller.getBarberById);

  // Update barber
  router.put("/:barberId", controller.updateBarber);

  // Delete barber
  router.delete("/:barberId", controller.deleteBarber);

  return router;
}
