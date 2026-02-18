import mongoose from "mongoose";
import { mongoUri } from "../config/env";

export async function connectDb(): Promise<void> {
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }
  await mongoose.connect(mongoUri);
}
