import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  created_ts?: Date;
  updated_ts?: Date;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, "id" | "parent_id">;

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare parent_id: number | null;
  declare created_ts: Date;
  declare updated_ts: Date;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    parent_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, defaultValue: null },
  },
  { sequelize, tableName: "categories", createdAt: "created_ts", updatedAt: "updated_ts" }
);

export default Category;
