import mongoose, { Schema } from "mongoose";
import { PaymentType } from "../interfaces/paymentType.interface";

const PaymentTypeSchema = new Schema<PaymentType>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export const PaymentTypeModel = mongoose.model<PaymentType>("PaymentType", PaymentTypeSchema);
