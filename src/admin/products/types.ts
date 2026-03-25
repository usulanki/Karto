export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  created_ts: Date;
}
