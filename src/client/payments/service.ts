import { Payment, Order } from "../../models/index";
import type { CreatePaymentDto } from "./types";

export const processPayment = async (userId: string, data: CreatePaymentDto) => {
  const order = await Order.findOne({ where: { id: Number(data.orderId), user_id: Number(userId) } });
  if (!order) throw new Error("Order not found");

  const payment = await Payment.create({
    order_id: order.id,
    method: data.method,
    status: "pending",
  });

  // TODO: integrate payment gateway (Stripe, etc.)
  await payment.update({ status: "success" });
  await order.update({ order_status: "processing" });

  return payment;
};
