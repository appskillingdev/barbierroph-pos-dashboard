import type { Request, Response } from "express";
import { pool } from "../database/client.js";
import { getUserByEmail } from "../queries/users/users.queries.js";
import bcrypt from "bcrypt";

export default class AuthController {
  /**
   * Login endpoint
   * POST /auth/login
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({
          error: "Missing credentials",
          message: "Email and password are required",
        });
        return;
      }

      // Find user by email
      const users = await getUserByEmail.run({ email_address: email }, client);

      if (!users || users.length === 0) {
        res.status(401).json({
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
        return;
      }

      const user = users[0];

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        password,
        user?.password as string,
      );

      if (!isPasswordValid) {
        res.status(401).json({
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
        return;
      }

      // Create session
      (req.session.user as any) = {
        id: user?.ID,
        userId: user?.user_id,
        email: user?.email_address,
        fullName: user?.full_name,
        userType: user?.user_type || "",
      };

      // TODO: Redirect to frontend page once available
      // Frontend developer will provide the dashboard URL

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user?.ID,
          userId: user?.user_id,
          email: user?.email_address,
          fullName: user?.full_name,
          userType: user?.user_type || "",
        },
        // TODO: Add redirect URL when frontend is ready
        // redirectUrl: process.env.BB_SUITE_URL || process.env.BB_POS_URL
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "An error occurred during login",
      });
    } finally {
      client.release();
    }
  };

  /**
   * Logout endpoint
   * POST /auth/logout
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.session) {
        // Destroy session
        req.session.destroy((err: Error) => {
          if (err) {
            console.error("Logout error:", err);
            res.status(500).json({
              error: "Logout failed",
              message: "Could not destroy session",
            });
            return;
          }

          // Clear session cookie
          res.clearCookie("connect.sid");

          // TODO: Redirect to login page once frontend is ready
          res.status(200).json({
            success: true,
            message: "Logout successful",
            // TODO: Add redirect URL when frontend is ready
            // redirectUrl: process.env.BB_SUITE_URL + "/login"
          });
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Already logged out",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "An error occurred during logout",
      });
    }
  };

  /**
   * Check session endpoint
   * GET /auth/session
   */
  public checkSession = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.session?.user) {
        res.status(200).json({
          authenticated: true,
          user: req.session.user,
        });
      } else {
        res.status(401).json({
          authenticated: false,
          message: "Not authenticated",
        });
      }
    } catch (error) {
      console.error("Session check error:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Could not check session",
      });
    }
  };
}
