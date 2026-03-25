export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface AdminOrder {
  id: string;
  user_id: string;
  order_status: OrderStatus;
  total: number;
  created_ts: Date;
}
