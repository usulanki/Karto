import { User } from "../../models/index";

export const getAllUsers = async () => {
  return User.findAll({ attributes: { exclude: ["passwordHash"] } });
};

export const getUserById = async (id: string) => {
  return User.findByPk(Number(id), { attributes: { exclude: ["passwordHash"] } });
};

export const deleteUser = async (id: string): Promise<void> => {
  await User.destroy({ where: { id: Number(id) } });
};
