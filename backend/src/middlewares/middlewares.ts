import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

export const middleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Middleware executed");
  next();
};
