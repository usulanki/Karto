import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

export type PaymentMethod = "card" | "paypal";
export type PaymentStatus = "pending" | "success" | "failed";

interface PaymentAttributes {
  id: number;
  orderId: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

type PaymentCreationAttributes = Optional<PaymentAttributes, "id" | "status">;

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  declare id: number;
  declare orderId: number;
  declare method: PaymentMethod;
  declare status: PaymentStatus;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Payment.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    method: { type: DataTypes.ENUM("card", "paypal"), allowNull: false },
    status: { type: DataTypes.ENUM("pending", "success", "failed"), defaultValue: "pending" },
  },
  { sequelize, tableName: "payments" }
);

export default Payment;
