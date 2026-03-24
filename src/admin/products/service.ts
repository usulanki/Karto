import { Product } from "../../models/index";

export const getAllProducts = async () => {
  return Product.findAll({ order: [["createdAt", "DESC"]] });
};

export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
}) => {
  return Product.create(data);
};

export const updateProduct = async (id: string, data: Partial<{ name: string; description: string; price: number; stock: number; categoryId: number }>) => {
  const product = await Product.findByPk(Number(id));
  if (!product) return null;
  return product.update(data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await Product.destroy({ where: { id: Number(id) } });
};
