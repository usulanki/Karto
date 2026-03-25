import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";
import type { OrderStatus } from "./types";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query["page"] as string) || 1);
  const limit = Math.max(1, parseInt(req.query["limit"] as string) || 20);
  const order_status = req.query["order_status"] as OrderStatus | undefined;
  const result = await service.listOrders(page, limit, order_status);
  sendSuccess(res, result);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.createOrder(req.body);
  sendSuccess(res, order, "Order created", 201);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteOrder(Number(req.params["id"]));
  sendSuccess(res, null, "Order deleted");
});

export const changeStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.changeOrderStatus(Number(req.params["id"]), req.body.order_status);
  sendSuccess(res, order, "Order status updated");
});
