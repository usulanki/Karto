import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query["page"] as string) || 1);
  const limit = Math.max(1, parseInt(req.query["limit"] as string) || 100);
  const result = await service.listRoles(page, limit, req.admin!.role_id, req.admin!.id);
  sendSuccess(res, result);
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const roles = await service.getAllRoles(req.admin!.role_id, req.admin!.id);
  sendSuccess(res, roles);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const role = await service.createRole(req.body, req.admin!.id);
  sendSuccess(res, role, "Role created", 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const role = await service.updateRole(
    Number(req.params["id"]),
    req.body,
    req.admin!.role_id,
    req.admin!.id
  );
  sendSuccess(res, role, "Role updated");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteRole(Number(req.params["id"]), req.admin!.role_id, req.admin!.id);
  sendSuccess(res, null, "Role deleted");
});

export const changeStatus = asyncHandler(async (req: Request, res: Response) => {
  const role = await service.changeRoleStatus(
    Number(req.params["id"]),
    req.body.status,
    req.admin!.role_id,
    req.admin!.id
  );
  sendSuccess(res, role, "Role status updated");
});
