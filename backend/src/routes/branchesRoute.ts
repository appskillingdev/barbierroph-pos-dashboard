import { Router } from "express";
import BranchesController from "../controllers/branches.js";

export function branchesRoute(): Router {
  const router = Router();
  const controller = new BranchesController();

  // Create branch
  router.post("/", controller.createBranch);

  // Get all branches
  router.get("/", controller.getAllBranches);

  // Get branches by owner
  router.get("/owner/:ownerId", controller.getBranchesByOwner);

  // Get branches by location
  router.get("/location/:location", controller.getBranchesByLocation);

  // Get branch by ID
  router.get("/:branchId", controller.getBranchById);

  // Update branch
  router.put("/:branchId", controller.updateBranch);

  // Delete branch
  router.delete("/:branchId", controller.deleteBranch);

  return router;
}
