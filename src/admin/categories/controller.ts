import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query["page"] as string) || 1);
  const limit = Math.max(1, parseInt(req.query["limit"] as string) || 20);
  const outlet_id = req.query["outlet_id"] ? Number(req.query["outlet_id"]) : undefined;
  const result = await service.listCategories(page, limit, outlet_id);
  sendSuccess(res, result);
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const outlet_id = req.query["outlet_id"] ? Number(req.query["outlet_id"]) : undefined;
  const categories = await service.getAllCategories(outlet_id);
  sendSuccess(res, categories);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const category = await service.getCategoryById(Number(req.params["id"]));
  sendSuccess(res, category);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const category = await service.createCategory(req.body);
  sendSuccess(res, category, "Category created", 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const category = await service.updateCategory(Number(req.params["id"]), req.body);
  sendSuccess(res, category, "Category updated");
});
