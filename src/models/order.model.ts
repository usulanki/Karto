import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderAttributes {
  id: number;
  user_id: number;
  store_id: number;
  outlet_id: number;
  order_no: string;
  order_status: OrderStatus;
  tax: number;
  order_amount: number;
  invoice_no: string | null;
  source: string;
  total: number;
  created_ts?: Date;
  updated_ts?: Date;
}

type OrderCreationAttributes = Optional<OrderAttributes, "id" | "order_status" | "invoice_no">;

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  declare id: number;
  declare user_id: number;
  declare store_id: number;
  declare outlet_id: number;
  declare order_no: string;
  declare order_status: OrderStatus;
  declare tax: number;
  declare order_amount: number;
  declare invoice_no: string | null;
  declare source: string;
  declare total: number;
  declare created_ts: Date;
  declare updated_ts: Date;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    store_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    outlet_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    order_no: { type: DataTypes.STRING(50), allowNull: false },
    order_status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    tax: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    order_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    invoice_no: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    source: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "WEB" },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    tableName: "orders",
    createdAt: "created_ts",
    updatedAt: "updated_ts",
    indexes: [
      { unique: true, fields: ["order_no"], name: "orders_order_no_unique" },
    ],
  }
);

export default Order;
