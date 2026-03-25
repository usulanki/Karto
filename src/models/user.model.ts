import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

export type UserRole = "admin" | "customer";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_ts?: Date;
  updated_ts?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "role">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password_hash: string;
  declare role: UserRole;
  declare created_ts: Date;
  declare updated_ts: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "customer"), defaultValue: "customer" },
  },
  { sequelize, tableName: "users", createdAt: "created_ts", updatedAt: "updated_ts" }
);

export default User;
