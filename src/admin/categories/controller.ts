import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const getAllCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await service.getAllCategories();
  sendSuccess(res, categories);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await service.createCategory(req.body);
  sendSuccess(res, category, "Category created", 201);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await service.updateCategory(req.params["id"] as string, req.body);
  sendSuccess(res, category);
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteCategory(req.params["id"] as string);
  sendSuccess(res, null, "Category deleted");
});
