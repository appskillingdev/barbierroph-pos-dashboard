import express from "express";
import { authRoute } from "./routes/authRoute.js";
import { salesRoute } from "./routes/salesRoute.js";
import { servicesRoute } from "./routes/servicesRoute.js";
import { branchesRoute } from "./routes/branchesRoute.js";
import { usersRoute } from "./routes/usersRoute.js";
import { barbersRoute } from "./routes/barbersRoute.js";
import { inventoryRoute } from "./routes/inventoryRoute.js";
import { customersRoute } from "./routes/customersRoute.js";
import { paymentMethodsRoute } from "./routes/paymentMethodsRoute.js";
import { checkoutRoute } from "./routes/checkoutRoute.js";
import { queueRoute } from "./routes/queueRoute.js";
import { slotsRoute } from "./routes/slotsRoute.js";
import {
  requireAuth,
  requirePermission,
  requireUserType,
  UserType,
} from "./controllers/helper/authorizationHandler.js";
import rateLimit from "express-rate-limit";

export function BarbierroAPIRoutes(): express.Express {
  const app = express();
  const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 5 minutes",
  });

  // Authentication (public routes - no auth required)
  app.use("/auth", authLimiter, authRoute());

  // Protected routes - All require authentication
  // Apply requireAuth middleware to all routes below

  // Sales - All authenticated users can send sales data
  app.use("/sales", requirePermission("canSendSalesData"), salesRoute());

  // Services - All can view, only P01 can CUD (permissions handled inside servicesRoute)
  app.use("/services", requireAuth, servicesRoute());

  // Branches - Only P01 (Master) can manage branches
  app.use("/branches", requirePermission("canManageBranches"), branchesRoute());

  // Users - Only P01 can manage users
  app.use("/users", requireUserType(UserType.MASTER), usersRoute());

  // Barbers - P01 and P02 can CRUD barbers
  app.use("/barbers", requirePermission("canCRUDBarbers"), barbersRoute());

  // Inventory - Only P01 can restock
  app.use(
    "/inventory",
    requirePermission("canRestockInventory"),
    inventoryRoute(),
  );

  // Customers - All authenticated users
  app.use("/customers", customersRoute());

  // Payment Methods - All authenticated users
  app.use("/payment-methods", paymentMethodsRoute());

  // POS - Checkout - All authenticated users can checkout
  app.use("/checkout", checkoutRoute());

  // POS - Queue - All authenticated users can view queue
  app.use("/queue", requirePermission("canViewQueue"), queueRoute());

  // POS - Slots - All authenticated users
  app.use("/slots", slotsRoute());

  return app;
}
