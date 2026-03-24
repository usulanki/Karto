import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const getAllOrders = asyncHandler(async (_req: Request, res: Response) => {
  const orders = await service.getAllOrders();
  sendSuccess(res, orders);
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.updateOrderStatus(req.params["id"] as string, req.body.status);
  sendSuccess(res, order);
});
