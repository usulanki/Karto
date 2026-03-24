import { Review } from "../../models/index";
import type { CreateReviewDto } from "./types";

export const getProductReviews = async (productId: string) => {
  return Review.findAll({
    where: { productId: Number(productId) },
    order: [["createdAt", "DESC"]],
  });
};

export const createReview = async (userId: string, data: CreateReviewDto) => {
  return Review.create({
    userId: Number(userId),
    productId: Number(data.productId),
    rating: data.rating,
    comment: data.comment,
  });
};
