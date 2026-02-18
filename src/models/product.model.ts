import mongoose, { Schema } from "mongoose";
import { Product } from "../interfaces/product.interface";

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: false },
    inStock: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<Product>("Product", ProductSchema);
