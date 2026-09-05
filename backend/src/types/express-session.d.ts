import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      userId: string;
      email: string;
      fullName: string;
      userType: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        userId: string;
        email: string;
        fullName: string;
        userType: string;
      };
    }
  }
}

export {};
