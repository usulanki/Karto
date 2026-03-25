import type { Request, Response, NextFunction } from "express";
import { Menu, Permission } from "../../models/index";
import type { AppError } from "./error.middleware";

type PermissionField = "view" | "add" | "edit" | "delete";

const methodToField: Record<string, PermissionField> = {
  GET: "view",
  POST: "add",
  PUT: "edit",
  PATCH: "edit",
  DELETE: "delete",
};

export const checkPermission = (menuLink: string) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const menu = await Menu.findOne({ where: { link: menuLink, parent_id: null } });
      if (!menu) {
        const err: AppError = Object.assign(new Error("Menu not configured"), { statusCode: 403 });
        return next(err);
      }

      const { role_id, store_id } = req.admin!;
      const field = methodToField[req.method.toUpperCase()] ?? "view";

      const permission = await Permission.findOne({
        where: { menu_id: menu.id, role_id, store_id: store_id ?? null },
      });

      if (!permission || !permission[field]) {
        const err: AppError = Object.assign(new Error("Access denied"), { statusCode: 403 });
        return next(err);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
