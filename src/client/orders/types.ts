export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  status: OrderStatus;
  total: number;
  createdAt: Date;
}
