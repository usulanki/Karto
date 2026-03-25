import { Role, Admin, Store } from "../../models/index";
import type { AppError } from "../../shared/middleware/error.middleware";
import type { CreateRoleDto, UpdateRoleDto } from "./types";

const systemRoleError = (): AppError =>
  Object.assign(new Error("System roles cannot be modified or deleted"), { statusCode: 403 });

const notFoundError = (): AppError =>
  Object.assign(new Error("Role not found"), { statusCode: 404 });

export const listRoles = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await Role.findAndCountAll({
    where: { is_deleted: false },
    include: [
      { model: Store, as: "store", attributes: ["id", "name"] },
      { model: Admin, as: "creator", attributes: ["id", "username"] },
    ],
    limit,
    offset,
    order: [["id", "ASC"]],
  });
  return { rows, count, page, limit, totalPages: Math.ceil(count / limit) };
};

export const getAllRoles = async () => {
  return Role.findAll({
    where: { is_deleted: false, status: true },
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });
};

export const createRole = async (data: CreateRoleDto, adminId: number) => {
  return Role.create({ ...data, created_by: adminId });
};

export const updateRole = async (id: number, data: UpdateRoleDto) => {
  const role = await Role.findByPk(id);
  if (!role) throw notFoundError();
  if (role.created_by === null) throw systemRoleError();
  return role.update(data);
};

export const deleteRole = async (id: number) => {
  const role = await Role.findByPk(id);
  if (!role) throw notFoundError();
  if (role.created_by === null) throw systemRoleError();
  return role.update({ is_deleted: true });
};

export const changeRoleStatus = async (id: number, status: boolean) => {
  const role = await Role.findByPk(id);
  if (!role) throw notFoundError();
  if (role.created_by === null) throw systemRoleError();
  return role.update({ status });
};
