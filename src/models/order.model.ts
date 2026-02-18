import mongoose, { Schema } from "mongoose";
import { Order } from "../interfaces/order.interface";

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true, default: [] },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
