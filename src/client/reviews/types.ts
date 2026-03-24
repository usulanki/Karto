export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CreateReviewDto {
  productId: string;
  rating: number;
  comment: string;
}
