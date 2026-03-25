import { Permission, Menu } from "../../models/index";
import type { AppError } from "../../shared/middleware/error.middleware";
import type { UpdatePermissionDto } from "./types";

const notFoundError = (): AppError =>
  Object.assign(new Error("Permission not found"), { statusCode: 404 });

const accessDeniedError = (): AppError =>
  Object.assign(new Error("Access denied"), { statusCode: 403 });

export const getPermissionsByRole = async (roleId: number, storeId: number | null) => {
  const permissions = await Permission.findAll({
    where: { role_id: roleId, store_id: storeId },
    include: [
      {
        model: Menu,
        as: "Menu",
        attributes: ["id", "name", "link", "icon", "sort_order"],
        where: { parent_id: null },
      },
    ],
    order: [[{ model: Menu, as: "Menu" }, "sort_order", "ASC"]],
  });

  if (!permissions.length) {
    throw Object.assign(
      new Error("No permissions found for this role in your store"),
      { statusCode: 404 }
    );
  }

  return permissions;
};

export const updatePermission = async (
  id: number,
  data: UpdatePermissionDto,
  storeId: number | null
) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw notFoundError();
  if (permission.store_id !== storeId) throw accessDeniedError();
  return permission.update(data);
};
