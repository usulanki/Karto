import { Category } from "../../models/index";

export const getCategories = async () => {
  return Category.findAll({
    where: { parent_id: null },
    include: [{ model: Category, as: "children" }],
  });
};
