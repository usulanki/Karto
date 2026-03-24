import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await service.getCart(req.user?.id ?? "");
  sendSuccess(res, cart);
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await service.addToCart(req.user?.id ?? "", req.body);
  sendSuccess(res, cart);
});

export const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await service.removeFromCart(req.user?.id ?? "", req.params["productId"] as string);
  sendSuccess(res, cart);
});
