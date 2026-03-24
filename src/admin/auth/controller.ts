import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await service.adminLogin(req.body);
  sendSuccess(res, tokens, "Login successful");
});
