import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    userTypeId: { type: Schema.Types.ObjectId, ref: "UserType", required: false },
    token: { type: String, required: false },
    refreshToken: { type: String, required: false },
    refreshTokenExpiresAt: { type: Date, required: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
