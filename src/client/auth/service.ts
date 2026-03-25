import { User } from "../../models/index";
import type { RegisterDto, LoginDto, AuthTokens } from "./types";

export const register = async (data: RegisterDto): Promise<AuthTokens> => {
  // TODO: hash password with bcrypt, create user, sign JWT tokens
  await User.create({ name: data.name, email: data.email, password_hash: data.password });
  throw new Error("Not implemented: hash password and sign tokens");
};

export const login = async (data: LoginDto): Promise<AuthTokens> => {
  // TODO: find user, verify password, sign JWT tokens
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");
  throw new Error("Not implemented: verify password and sign tokens");
};
