import { Cart, CartItem, Product } from "../../models/index";
import type { CartItem as CartItemDto } from "./types";

const getOrCreateCart = async (userId: number) => {
  const [cart] = await Cart.findOrCreate({ where: { userId } });
  return cart;
};

export const getCart = async (userId: string) => {
  const cart = await getOrCreateCart(Number(userId));
  return Cart.findByPk(cart.id, {
    include: [{ model: CartItem, include: [{ model: Product, attributes: ["id", "name", "price"] }] }],
  });
};

export const addToCart = async (userId: string, item: CartItemDto) => {
  const cart = await getOrCreateCart(Number(userId));
  const [cartItem] = await CartItem.findOrCreate({
    where: { cartId: cart.id, productId: item.productId },
    defaults: { cartId: cart.id, productId: Number(item.productId), quantity: item.quantity },
  });
  if (cartItem.quantity !== item.quantity) {
    await cartItem.update({ quantity: cartItem.quantity + item.quantity });
  }
  return getCart(userId);
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await getOrCreateCart(Number(userId));
  await CartItem.destroy({ where: { cartId: cart.id, productId: Number(productId) } });
  return getCart(userId);
};
