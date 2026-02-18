import { UserModel } from "../models/user.model";
import { CreateUserInput, UpdateUserInput } from "../validations/user.validation";
import bcrypt from "bcryptjs";

export class UserService {
  static async create(input: CreateUserInput) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    return UserModel.create({
      ...input,
      password: undefined,
      passwordHash,
      token: undefined,
      refreshToken: undefined,
    });
  }

  static async list() {
    return UserModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return UserModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateUserInput) {
    const updateData = { ...input };
    if (input.password) {
      updateData.passwordHash = await bcrypt.hash(input.password, 10);
      updateData.password = undefined;
    }
    // Ensure token fields are not updated through user update
    updateData.token = undefined;
    updateData.refreshToken = undefined;
    return UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  static async remove(id: string) {
    return UserModel.findByIdAndDelete(id).exec();
  }

  static async logout(id: string) {
    return UserModel.findByIdAndUpdate(
      id,
      {
        token: undefined,
        refreshToken: undefined,
        refreshTokenExpiresAt: undefined,
      },
      { new: true }
    ).exec();
  }
}
