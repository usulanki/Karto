import { Product } from "../../models/index";

export const getAllProducts = async () => {
  return Product.findAll({ order: [["created_ts", "DESC"]] });
};

export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
}) => {
  return Product.create(data);
};

export const updateProduct = async (id: string, data: Partial<{ name: string; description: string; price: number; stock: number; category_id: number }>) => {
  const product = await Product.findByPk(Number(id));
  if (!product) return null;
  return product.update(data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await Product.destroy({ where: { id: Number(id) } });
};
