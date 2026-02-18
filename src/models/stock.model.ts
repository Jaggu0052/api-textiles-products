import mongoose, { Schema } from "mongoose";
import { Stock } from "../interfaces/stock.interface";

const StockSchema = new Schema<Stock>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 0 },
    location: { type: String, required: false },
  },
  { timestamps: true }
);

export const StockModel = mongoose.model<Stock>("Stock", StockSchema);
