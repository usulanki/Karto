import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  created_ts?: Date;
  updated_ts?: Date;
}

type ProductCreationAttributes = Optional<ProductAttributes, "id">;

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare stock: number;
  declare category_id: number;
  declare created_ts: Date;
  declare updated_ts: Date;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  { sequelize, tableName: "products", createdAt: "created_ts", updatedAt: "updated_ts" }
);

export default Product;
