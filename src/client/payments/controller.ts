import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const processPayment = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.processPayment(req.user?.id ?? "", req.body);
  sendSuccess(res, result, "Payment processed");
});
