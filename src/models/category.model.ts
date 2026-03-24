import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, "id" | "parentId">;

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare parentId: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    parentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, defaultValue: null },
  },
  { sequelize, tableName: "categories" }
);

export default Category;
