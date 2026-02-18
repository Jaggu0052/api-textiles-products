export interface PaymentType {
  name: string; // e.g., card, upi, cod
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
