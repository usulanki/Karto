import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderAttributes {
  id: number;
  userId: number;
  status: OrderStatus;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type OrderCreationAttributes = Optional<OrderAttributes, "id" | "status">;

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  declare id: number;
  declare userId: number;
  declare status: OrderStatus;
  declare total: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { sequelize, tableName: "orders" }
);

export default Order;
