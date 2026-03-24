import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import type { AppError } from "./error.middleware";

interface AdminJwtPayload {
  id: number;
  username: string;
  email: string;
  role_id: number;
}

export const adminMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    const err: AppError = Object.assign(new Error("No token provided"), { statusCode: 401 });
    return next(err);
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AdminJwtPayload;
    req.admin = { id: payload.id, username: payload.username, email: payload.email, role_id: payload.role_id };
    next();
  } catch {
    const err: AppError = Object.assign(new Error("Invalid or expired token"), { statusCode: 401 });
    next(err);
  }
};
