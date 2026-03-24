import { Payment, Order } from "../../models/index";
import type { CreatePaymentDto } from "./types";

export const processPayment = async (userId: string, data: CreatePaymentDto) => {
  const order = await Order.findOne({ where: { id: Number(data.orderId), userId: Number(userId) } });
  if (!order) throw new Error("Order not found");

  const payment = await Payment.create({
    orderId: order.id,
    method: data.method,
    status: "pending",
  });

  // TODO: integrate payment gateway (Stripe, etc.)
  await payment.update({ status: "success" });
  await order.update({ status: "processing" });

  return payment;
};
