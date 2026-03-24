import { Category } from "../../models/index";

export const getCategories = async () => {
  return Category.findAll({
    where: { parentId: null },
    include: [{ model: Category, as: "children" }],
  });
};
