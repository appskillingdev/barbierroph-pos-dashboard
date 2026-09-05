import express, { type Express } from "express";
import AuthController from "../controllers/auth.js";

export function authRoute(): Express {
  const app = express();
  const authController = new AuthController();

  /**
   * POST /auth/login
   * Login with email and password
   */
  app.post("/login", authController.login);

  /**
   * POST /auth/logout
   * Logout and destroy session
   */
  app.post("/logout", authController.logout);

  /**
   * GET /auth/session
   * Check current session status
   */
  app.get("/session", authController.checkSession);

  return app;
}
