import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await service.register(req.body);
  sendSuccess(res, tokens, "Registered successfully", 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await service.login(req.body);
  sendSuccess(res, tokens, "Logged in successfully");
});
