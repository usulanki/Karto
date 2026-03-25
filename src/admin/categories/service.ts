import { Category } from "../../models/index";

export const getAllCategories = async () => {
  return Category.findAll();
};

export const createCategory = async (data: { name: string; slug: string; parent_id?: number }) => {
  return Category.create(data);
};

export const updateCategory = async (id: string, data: Partial<{ name: string; slug: string; parent_id: number }>) => {
  const category = await Category.findByPk(Number(id));
  if (!category) return null;
  return category.update(data);
};

export const deleteCategory = async (id: string): Promise<void> => {
  await Category.destroy({ where: { id: Number(id) } });
};
