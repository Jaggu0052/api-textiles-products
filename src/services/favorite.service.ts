import { FavoriteModel } from "../models/favorite.model";
import { CreateFavoriteInput, UpdateFavoriteInput } from "../validations/favorite.validation";

export class FavoriteService {
  static async create(input: CreateFavoriteInput) {
    return FavoriteModel.create(input);
  }

  static async list() {
    return FavoriteModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return FavoriteModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateFavoriteInput) {
    return FavoriteModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return FavoriteModel.findByIdAndDelete(id).exec();
  }
}
