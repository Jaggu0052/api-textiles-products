export interface Payment {
  orderId: string;
  amount: number;
  paymentTypeId?: string;
  status: "pending" | "paid" | "failed";
  reference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
