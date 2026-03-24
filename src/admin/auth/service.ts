import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/index";
import { env } from "../../config/env";
import type { AdminLoginDto, AdminAuthTokens } from "./types";
import type { AppError } from "../../shared/middleware/error.middleware";

export const adminLogin = async (data: AdminLoginDto): Promise<AdminAuthTokens> => {
  const admin = await Admin.findOne({
    where: {
      [Op.or]: [{ email: data.login }, { username: data.login }],
      is_deleted: false,
      is_active: true,
    },
  });

  const invalidError: AppError = Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  if (!admin) throw invalidError;

  const passwordMatch = await bcrypt.compare(data.password, admin.password);
  if (!passwordMatch) throw invalidError;

  const accessToken = jwt.sign(
    { id: admin.id, username: admin.username, email: admin.email, role_id: admin.role_id },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: admin.id },
    env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
