import { Op } from "sequelize";
import { Product, Category } from "../../models/index";
import type { ProductQuery } from "./types";

export const getProducts = async (query: ProductQuery) => {
  const { search, category_id, page = 1, limit = 20 } = query;
  const where: Record<string, unknown> = {};
  if (search) where["name"] = { [Op.like]: `%${search}%` };
  if (category_id) where["category_id"] = category_id;

  return Product.findAndCountAll({
    where,
    include: [{ model: Category, attributes: ["id", "name"] }],
    limit,
    offset: (page - 1) * limit,
    order: [["created_ts", "DESC"]],
  });
};

export const getProductById = async (id: string) => {
  return Product.findByPk(Number(id), {
    include: [{ model: Category, attributes: ["id", "name"] }],
  });
};
