export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface ProductQuery {
  search?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}
