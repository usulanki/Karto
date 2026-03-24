import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type CartItemCreationAttributes = Optional<CartItemAttributes, "id">;

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  declare id: number;
  declare cartId: number;
  declare productId: number;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CartItem.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    cartId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
  },
  { sequelize, tableName: "cart_items" }
);

export default CartItem;
