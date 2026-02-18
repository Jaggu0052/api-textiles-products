import mongoose, { Schema } from "mongoose";
import { UserType } from "../interfaces/userType.interface";

const UserTypeSchema = new Schema<UserType>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export const UserTypeModel = mongoose.model<UserType>("UserType", UserTypeSchema);
