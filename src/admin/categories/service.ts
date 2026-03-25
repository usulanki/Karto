import { Category, Store, Outlet } from "../../models/index";
import type { AppError } from "../../shared/middleware/error.middleware";
import type { CreateCategoryDto, UpdateCategoryDto } from "./types";

const notFoundError = (): AppError =>
  Object.assign(new Error("Category not found"), { statusCode: 404 });

const includeAssociations = [
  { model: Store, attributes: ["id", "name"] },
  { model: Outlet, attributes: ["id", "name"] },
  { model: Category, as: "parent", attributes: ["id", "name", "slug"] },
];

export const listCategories = async (
  page: number,
  limit: number,
  outlet_id?: number
) => {
  const where: Record<string, unknown> = {};
  if (outlet_id) where["outlet_id"] = outlet_id;

  const { rows, count } = await Category.findAndCountAll({
    where,
    include: includeAssociations,
    limit,
    offset: (page - 1) * limit,
    order: [["id", "ASC"]],
  });

  return { rows, count, page, limit, totalPages: Math.ceil(count / limit) };
};

export const getAllCategories = async (outlet_id?: number) => {
  const where: Record<string, unknown> = {};
  if (outlet_id) where["outlet_id"] = outlet_id;

  return Category.findAll({
    where,
    include: includeAssociations,
    order: [["name", "ASC"]],
  });
};

export const getCategoryById = async (id: number) => {
  const category = await Category.findByPk(id, {
    include: [
      ...includeAssociations,
      { model: Category, as: "children", attributes: ["id", "name", "slug"] },
    ],
  });
  if (!category) throw notFoundError();
  return category;
};

export const createCategory = async (data: CreateCategoryDto) => {
  return Category.create(data);
};

export const updateCategory = async (id: number, data: UpdateCategoryDto) => {
  const category = await Category.findByPk(id);
  if (!category) throw notFoundError();
  return category.update(data);
};
