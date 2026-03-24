import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type OrderItemCreationAttributes = Optional<OrderItemAttributes, "id">;

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  declare id: number;
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
  declare price: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

OrderItem.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { sequelize, tableName: "order_items" }
);

export default OrderItem;
