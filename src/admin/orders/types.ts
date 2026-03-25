export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface CreateOrderItemDto {
  product_id: number;
  quantity: number;
  price: number;
  tax?: number;
  total: number;
}

export interface CreateOrderDto {
  user_id: number;
  store_id: number;
  outlet_id: number;
  order_no: string;
  order_amount: number;
  tax?: number;
  total: number;
  invoice_no?: string;
  source?: string;
  items: CreateOrderItemDto[];
}

export interface ChangeOrderStatusDto {
  order_status: OrderStatus;
}
