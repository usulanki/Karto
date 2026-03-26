import { Cart, Product } from "../../models/index";
import type { CartItem as CartItemDto } from "./types";

export const getCart = async (userId: string) => {
  return Cart.findAll({
    where: { user_id: Number(userId), is_removed: false },
    include: [{ model: Product, attributes: ["id", "name", "price"] }],
  });
};

export const addToCart = async (userId: string, item: CartItemDto) => {
  const existing = await Cart.findOne({
    where: { user_id: Number(userId), product_id: Number(item.productId), is_removed: false },
  });
  if (existing) {
    await existing.update({ quantity: existing.quantity + item.quantity });
  } else {
    await Cart.create({
      user_id: Number(userId),
      product_id: Number(item.productId),
      quantity: item.quantity,
    });
  }
  return getCart(userId);
};

export const removeFromCart = async (userId: string, productId: string) => {
  await Cart.update(
    { is_removed: true },
    { where: { user_id: Number(userId), product_id: Number(productId), is_removed: false } }
  );
  return getCart(userId);
};
