import mongoose, { Schema } from "mongoose";
import { Favorite } from "../interfaces/favorite.interface";

const FavoriteSchema = new Schema<Favorite>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

FavoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const FavoriteModel = mongoose.model<Favorite>("Favorite", FavoriteSchema);
