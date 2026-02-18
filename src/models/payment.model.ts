import mongoose, { Schema } from "mongoose";
import { Payment } from "../interfaces/payment.interface";

const PaymentSchema = new Schema<Payment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentTypeId: { type: Schema.Types.ObjectId, ref: "PaymentType", required: false },
    status: { type: String, required: true, enum: ["pending", "paid", "failed"], default: "pending" },
    reference: { type: String, required: false },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model<Payment>("Payment", PaymentSchema);
