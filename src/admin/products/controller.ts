import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const getAllProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await service.getAllProducts();
  sendSuccess(res, products);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await service.createProduct(req.body);
  sendSuccess(res, product, "Product created", 201);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await service.updateProduct(req.params["id"] as string, req.body);
  sendSuccess(res, product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteProduct(req.params["id"] as string);
  sendSuccess(res, null, "Product deleted");
});
