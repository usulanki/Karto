import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const getByRole = asyncHandler(async (req: Request, res: Response) => {
  const roleId = parseInt(req.query["role_id"] as string);
  if (!roleId || isNaN(roleId)) {
    const err = Object.assign(new Error("role_id query parameter is required"), { statusCode: 400 });
    throw err;
  }
  const permissions = await service.getPermissionsByRole(roleId, req.admin!.store_id);
  sendSuccess(res, permissions);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const permission = await service.updatePermission(
    Number(req.params["id"]),
    req.body,
    req.admin!.store_id
  );
  sendSuccess(res, permission, "Permission updated");
});
