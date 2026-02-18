export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
