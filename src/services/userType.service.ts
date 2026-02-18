import { UserTypeModel } from "../models/userType.model";
import { CreateUserTypeInput, UpdateUserTypeInput } from "../validations/userType.validation";

export class UserTypeService {
  static async create(input: CreateUserTypeInput) {
    return UserTypeModel.create(input);
  }

  static async list() {
    return UserTypeModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return UserTypeModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateUserTypeInput) {
    return UserTypeModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return UserTypeModel.findByIdAndDelete(id).exec();
  }
}
