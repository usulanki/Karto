import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";
import { createAdminSchema, updateAdminSchema } from "./types";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = createAdminSchema.parse({
    ...req.body,
    role_id: Number(req.body.role_id),
  });
  const admin = await service.createAdmin(data, req.admin!.store_id, req.admin!.id);
  sendSuccess(res, admin, "Admin created successfully", 201);
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const admins = await service.getAllAdmins(req.admin!.id, req.admin!.role_id, req.admin!.store_id);
  sendSuccess(res, admins);
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const page      = Math.max(1, parseInt(req.query["page"]      as string) || 1);
  const limit     = Math.max(1, parseInt(req.query["limit"]     as string) || 20);
  const rawRoleId   = typeof req.query.role_id   === "string" ? parseInt(req.query.role_id,   10) : NaN;
  const rawOutletId = typeof req.query.outlet_id === "string" ? parseInt(req.query.outlet_id, 10) : NaN;
  const rawSort     = typeof req.query.sortField === "string" ? req.query.sortField : "created_ts";
  const rawDir      = typeof req.query.sortDir   === "string" ? req.query.sortDir   : "desc";

  const filters: service.ListAdminsFilters = {
    page,
    limit,
    sortField: (["fname", "created_ts"] as const).includes(rawSort as "fname") ? rawSort as "fname" | "created_ts" : "created_ts",
    sortDir:   rawDir === "asc" ? "asc" : "desc",
  };
  if (!isNaN(rawRoleId))   filters.role_id   = rawRoleId;
  if (!isNaN(rawOutletId)) filters.outlet_id = rawOutletId;

  const result = await service.listAdmins(req.admin!.id, req.admin!.role_id, req.admin!.store_id, filters);
  sendSuccess(res, result);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await service.deleteAdmin(id, req.admin!.id, req.admin!.role_id, req.admin!.store_id);
  sendSuccess(res, result, "Admin deleted successfully");
});

export const changeStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await service.changeAdminStatus(id, req.admin!.id, req.admin!.role_id, req.admin!.store_id);
  sendSuccess(res, result, "Admin status updated successfully");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = updateAdminSchema.parse({
    ...req.body,
    ...(req.body.role_id   !== undefined && { role_id:   Number(req.body.role_id) }),
    ...(req.body.outlet_id !== undefined && { outlet_id: req.body.outlet_id === null ? null : Number(req.body.outlet_id) }),
  });
  const result = await service.updateAdmin(id, data, req.admin!.id, req.admin!.role_id, req.admin!.store_id);
  sendSuccess(res, result, "Admin updated successfully");
});
