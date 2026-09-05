import { Router } from "express";
import QueueController from "../controllers/queue.js";

export function queueRoute(): Router {
  const router = Router();
  const controller = new QueueController();

  // Create queue
  router.post("/", controller.createQueue);

  // Get all queues
  router.get("/", controller.getAllQueues);

  // Get queues by status
  router.get("/status/:status", controller.getQueuesByStatus);

  // Get queues by branch
  router.get("/branch/:branchId", controller.getQueuesByBranch);

  // Get queues by barber
  router.get("/barber/:barberId", controller.getQueuesByBarber);

  // Get queues by customer name
  router.get("/customer/:name", controller.getQueuesByCustomerName);

  // Get queue by ID
  router.get("/:id", controller.getQueueById);

  // Update queue
  router.put("/:id", controller.updateQueue);

  // Update queue status
  router.patch("/:id/status", controller.updateQueueStatus);

  // Delete queue
  router.delete("/:id", controller.deleteQueue);

  return router;
}
