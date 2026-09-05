import type { Request, Response, NextFunction } from "express";

// User type privileges
export enum UserType {
  MASTER = "P01",
  BRANCH_MANAGER = "P02",
  CASHIER = "P03",
}

// Define permissions matrix
export const permissions = {
  // Sales operations
  canSendSalesData: [
    UserType.MASTER,
    UserType.BRANCH_MANAGER,
    UserType.CASHIER,
  ],

  // Barber operations
  canCRUDBarbers: [UserType.MASTER, UserType.BRANCH_MANAGER],

  // Analytics
  canViewAnalytics: [UserType.MASTER, UserType.BRANCH_MANAGER],

  // Branch operations
  canManageBranches: [UserType.MASTER],
  canCheckOtherBranches: [UserType.MASTER],

  // Inventory operations
  canRestockInventory: [UserType.MASTER],

  // Service operations
  canCUDServices: [UserType.MASTER],
  canViewServices: [UserType.MASTER, UserType.BRANCH_MANAGER, UserType.CASHIER],

  // Queue operations
  canViewQueue: [UserType.MASTER, UserType.BRANCH_MANAGER, UserType.CASHIER],
};

export type PermissionKey = keyof typeof permissions;

/**
 * Middleware to check if user has required permission
 */
export const requirePermission = (permission: PermissionKey) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userType = req.user?.userType;

    if (!userType) {
      res.status(401).json({ error: "Unauthorized: Not authenticated" });
      return;
    }

    const allowedUserTypes = permissions[permission];

    if (!allowedUserTypes.includes(userType as UserType)) {
      res.status(403).json({
        error: "Forbidden: Insufficient permissions",
        required: permission,
        userType: userType,
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to require specific user types
 */
export const requireUserType = (...allowedTypes: UserType[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userType = req.user?.userType;

    if (!userType) {
      res.status(401).json({ error: "Unauthorized: Not authenticated" });
      return;
    }

    if (!allowedTypes.includes(userType as UserType)) {
      res.status(403).json({
        error: "Forbidden: Insufficient permissions",
        userType: userType,
        requiredTypes: allowedTypes,
      });
      return;
    }

    next();
  };
};

/**
 * Check if a user type has a specific permission
 */
export const hasPermission = (
  userType: string,
  permission: PermissionKey,
): boolean => {
  const allowedTypes = permissions[permission];
  return allowedTypes.includes(userType as UserType);
};

/**
 * Middleware to check authentication
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.session?.user) {
    res.status(401).json({ error: "Unauthorized: Please login" });
    return;
  }

  req.user = req.session.user;
  next();
};
