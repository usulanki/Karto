import sequelize from "../../config/database";
import { Order, OrderItem, Product, User } from "../../models/index";
import type { AppError } from "../../shared/middleware/error.middleware";
import type { CreateOrderDto, OrderStatus } from "./types";

const notFoundError = (): AppError =>
  Object.assign(new Error("Order not found"), { statusCode: 404 });

export const listOrders = async (page: number, limit: number, order_status?: OrderStatus) => {
  const where: Record<string, unknown> = {};
  if (order_status) where["order_status"] = order_status;

  const { rows, count } = await Order.findAndCountAll({
    where,
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: OrderItem, include: [{ model: Product, attributes: ["id", "name"] }] },
    ],
    limit,
    offset: (page - 1) * limit,
    order: [["created_ts", "DESC"]],
  });

  return { rows, count, page, limit, totalPages: Math.ceil(count / limit) };
};

export const createOrder = async (data: CreateOrderDto) => {
  const t = await sequelize.transaction();
  try {
    const order = await Order.create(
      {
        user_id: data.user_id,
        store_id: data.store_id,
        outlet_id: data.outlet_id,
        order_no: data.order_no,
        order_amount: data.order_amount,
        tax: data.tax ?? 0,
        total: data.total,
        invoice_no: data.invoice_no ?? null,
        source: data.source ?? "WEB",
      },
      { transaction: t }
    );

    await Promise.all(
      data.items.map((item) =>
        OrderItem.create(
          {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            tax: item.tax ?? 0,
            total: item.total,
          },
          { transaction: t }
        )
      )
    );

    await t.commit();

    return Order.findByPk(order.id, {
      include: [{ model: OrderItem, include: [{ model: Product, attributes: ["id", "name"] }] }],
    });
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const deleteOrder = async (id: number): Promise<void> => {
  const order = await Order.findByPk(id);
  if (!order) throw notFoundError();
  await order.destroy();
};

export const changeOrderStatus = async (id: number, order_status: OrderStatus) => {
  const order = await Order.findByPk(id);
  if (!order) throw notFoundError();
  return order.update({ order_status });
};
