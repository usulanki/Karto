import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { sendSuccess } from "../../shared/utils/apiResponse";
import * as service from "./service";

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await service.getAllUsers();
  sendSuccess(res, users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await service.getUserById(req.params["id"] as string);
  sendSuccess(res, user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteUser(req.params["id"] as string);
  sendSuccess(res, null, "User deleted");
});
