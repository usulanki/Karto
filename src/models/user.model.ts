import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

export type UserRole = "admin" | "customer";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "role">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare role: UserRole;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "customer"), defaultValue: "customer" },
  },
  { sequelize, tableName: "users" }
);

export default User;
