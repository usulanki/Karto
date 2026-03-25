import { Op, literal, type WhereOptions } from "sequelize";
import { Role, Admin, Store } from "../../models/index";
import type { AppError } from "../../shared/middleware/error.middleware";
import type { CreateRoleDto, UpdateRoleDto } from "./types";

const systemRoleError = (): AppError =>
  Object.assign(new Error("System roles cannot be modified or deleted"), { statusCode: 403 });

const notFoundError = (): AppError =>
  Object.assign(new Error("Role not found"), { statusCode: 404 });

const accessDeniedError = (): AppError =>
  Object.assign(new Error("Access denied"), { statusCode: 403 });

/**
 * Returns a WHERE fragment scoping roles to what the caller is allowed to see/manage.
 *
 * SUPERADMIN / MANAGER → only roles they personally created
 * ADMIN               → roles they created + roles created by any MANAGER
 */
async function buildCallerScope(callerRoleId: number, callerAdminId: number): Promise<WhereOptions> {
  const callerRole = await Role.findByPk(callerRoleId, { attributes: ["code"] });
  if (!callerRole) throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });

  if (callerRole.code === "ADMIN") {
    const managerRole = await Role.findOne({ where: { code: "MANAGER" }, attributes: ["id"] });
    if (!managerRole) return { created_by: callerAdminId };
    return {
      [Op.or]: [
        { created_by: callerAdminId },
        {
          created_by: {
            [Op.in]: literal(`(SELECT id FROM admins WHERE role_id = ${managerRole.id})`),
          },
        },
      ],
    };
  }

  // SUPERADMIN or MANAGER: only their own
  return { created_by: callerAdminId };
}

export const listRoles = async (
  page: number,
  limit: number,
  callerRoleId: number,
  callerAdminId: number
) => {
  const offset = (page - 1) * limit;
  const scope = await buildCallerScope(callerRoleId, callerAdminId);
  const { rows, count } = await Role.findAndCountAll({
    where: { is_deleted: false, ...scope },
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

export const getAllRoles = async (callerRoleId: number, callerAdminId: number) => {
  const scope = await buildCallerScope(callerRoleId, callerAdminId);
  return Role.findAll({
    where: { is_deleted: false, status: true, ...scope },
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });
};

export const createRole = async (data: CreateRoleDto, adminId: number) => {
  return Role.create({ ...data, created_by: adminId });
};

export const updateRole = async (
  id: number,
  data: UpdateRoleDto,
  callerRoleId: number,
  callerAdminId: number
) => {
  const role = await Role.findByPk(id);
  if (!role) throw notFoundError();
  if (role.created_by === null) throw systemRoleError();

  const scope = await buildCallerScope(callerRoleId, callerAdminId);
  const allowed = await Role.findOne({ where: { id, ...scope } });
  if (!allowed) throw accessDeniedError();

  return role.update(data);
};

export const deleteRole = async (
  id: number,
  callerRoleId: number,
  callerAdminId: number
) => {
  const role = await Role.findByPk(id);
  if (!role) throw notFoundError();
  if (role.created_by === null) throw systemRoleError();

  const scope = await buildCallerScope(callerRoleId, callerAdminId);
  const allowed = await Role.findOne({ where: { id, ...scope } });
  if (!allowed) throw accessDeniedError();

  return role.update({ is_deleted: true });
};

export const changeRoleStatus = async (
  id: number,
  status: boolean,
  callerRoleId: number,
  callerAdminId: number
) => {
  const role = await Role.findByPk(id);
  if (!role) throw notFoundError();
  if (role.created_by === null) throw systemRoleError();

  const scope = await buildCallerScope(callerRoleId, callerAdminId);
  const allowed = await Role.findOne({ where: { id, ...scope } });
  if (!allowed) throw accessDeniedError();

  return role.update({ status });
};
