export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt: Date;
}
