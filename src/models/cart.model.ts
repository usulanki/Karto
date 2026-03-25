import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface CartAttributes {
  id: number;
  user_id: number;
  created_ts?: Date;
  updated_ts?: Date;
}

type CartCreationAttributes = Optional<CartAttributes, "id">;

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  declare id: number;
  declare user_id: number;
  declare created_ts: Date;
  declare updated_ts: Date;
}

Cart.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  },
  { sequelize, tableName: "carts", createdAt: "created_ts", updatedAt: "updated_ts" }
);

export default Cart;
