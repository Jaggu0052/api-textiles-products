import mongoose, { Schema } from "mongoose";
import { Cart } from "../interfaces/cart.interface";

const CartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const CartSchema = new Schema<Cart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [CartItemSchema], required: true, default: [] },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model<Cart>("Cart", CartSchema);
