import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await service.adminLogin(req.body);
  sendSuccess(res, tokens, "Login successful");
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  await service.adminLogout();
  sendSuccess(res, null, "Logout successful");
});
