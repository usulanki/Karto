import { Order, OrderItem, Cart, CartItem, Product } from "../../models/index";

export const getOrders = async (userId: string) => {
  return Order.findAll({
    where: { userId: Number(userId) },
    include: [{ model: OrderItem, include: [{ model: Product, attributes: ["id", "name"] }] }],
    order: [["createdAt", "DESC"]],
  });
};

export const getOrderById = async (userId: string, orderId: string) => {
  return Order.findOne({
    where: { id: Number(orderId), userId: Number(userId) },
    include: [{ model: OrderItem, include: [{ model: Product, attributes: ["id", "name"] }] }],
  });
};

export const createOrder = async (userId: string) => {
  const cart = await Cart.findOne({
    where: { userId: Number(userId) },
    include: [{ model: CartItem, include: [Product] }],
  });
  if (!cart) throw new Error("Cart is empty");

  const items = await CartItem.findAll({ where: { cartId: cart.id }, include: [Product] });
  if (items.length === 0) throw new Error("Cart is empty");

  const total = items.reduce((sum, item) => {
    const product = item.get("Product") as Product;
    return sum + item.quantity * Number(product.price);
  }, 0);

  const order = await Order.create({ userId: Number(userId), total });
  await Promise.all(
    items.map((item) => {
      const product = item.get("Product") as Product;
      return OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: Number(product.price),
      });
    })
  );

  await CartItem.destroy({ where: { cartId: cart.id } });
  return order;
};
