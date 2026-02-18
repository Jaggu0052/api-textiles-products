export interface Stock {
  productId: string;
  quantity: number;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
