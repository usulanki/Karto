import { Order, OrderItem, Product, User } from "../../models/index";
import type { OrderStatus } from "../orders/types";

export const getAllOrders = async () => {
  return Order.findAll({
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: OrderItem, include: [{ model: Product, attributes: ["id", "name"] }] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const order = await Order.findByPk(Number(id));
  if (!order) return null;
  return order.update({ status });
};
