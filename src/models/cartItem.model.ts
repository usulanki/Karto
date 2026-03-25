import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface CartItemAttributes {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  created_ts?: Date;
  updated_ts?: Date;
}

type CartItemCreationAttributes = Optional<CartItemAttributes, "id">;

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  declare id: number;
  declare cart_id: number;
  declare product_id: number;
  declare quantity: number;
  declare created_ts: Date;
  declare updated_ts: Date;
}

CartItem.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    product_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
  },
  { sequelize, tableName: "cart_items", createdAt: "created_ts", updatedAt: "updated_ts" }
);

export default CartItem;
