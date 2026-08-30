import { Router } from "express";
import SlotsController from "../controllers/slots.js";

export function slotsRoute(): Router {
  const router = Router();
  const controller = new SlotsController();

  // Create slot
  router.post("/", controller.createSlot);

  // Get all slots
  router.get("/", controller.getAllSlots);

  // Get slots by status
  router.get("/status/:status", controller.getSlotsByStatus);

  // Get available slots by branch
  router.get(
    "/branch/:branchId/available",
    controller.getAvailableSlotsByBranch,
  );

  // Get slots by branch
  router.get("/branch/:branchId", controller.getSlotsByBranch);

  // Get slots by barber
  router.get("/barber/:barberId", controller.getSlotsByBarber);

  // Get slot by ID
  router.get("/:id", controller.getSlotById);

  // Update slot
  router.put("/:id", controller.updateSlot);

  // Update slot status
  router.patch("/:id/status", controller.updateSlotStatus);

  // Delete slot
  router.delete("/:id", controller.deleteSlot);

  return router;
}
