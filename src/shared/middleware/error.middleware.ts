import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: AppError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (process.env["NODE_ENV"] !== "production") {
    console.error(err);
  }

  if (err instanceof ZodError) {
    const message = err.issues.map((e) => e.message).join("; ");
    res.status(400).json({ success: false, message });
    return;
  }

  const statusCode = (err as AppError).statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
