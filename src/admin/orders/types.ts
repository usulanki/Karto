export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface AdminOrder {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: Date;
}
