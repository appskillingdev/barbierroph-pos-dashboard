import { Router } from "express";
import UsersController from "../controllers/users.js";

export function usersRoute(): Router {
  const router = Router();
  const controller = new UsersController();

  // Create user
  router.post("/", controller.createUser);

  // Get all users
  router.get("/", controller.getAllUsers);

  // Get user by email
  router.get("/email/:email", controller.getUserByEmail);

  // Get user by user ID
  router.get("/userId/:userId", controller.getUserByUserId);

  // Get user by ID
  router.get("/:id", controller.getUserById);

  // Update user
  router.put("/:id", controller.updateUser);

  // Update user password
  router.patch("/:id/password", controller.updateUserPassword);

  // Delete user
  router.delete("/:id", controller.deleteUser);

  return router;
}
