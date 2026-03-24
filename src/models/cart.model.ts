import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface CartAttributes {
  id: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type CartCreationAttributes = Optional<CartAttributes, "id">;

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  declare id: number;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Cart.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  },
  { sequelize, tableName: "carts" }
);

export default Cart;
