import { CartModel } from "../models/cart.model";
import { CreateCartInput, UpdateCartInput } from "../validations/cart.validation";

export class CartService {
  static async create(input: CreateCartInput) {
    return CartModel.create({
      userId: input.userId,
      items: input.items ?? [],
    });
  }

  static async list() {
    return CartModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return CartModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateCartInput) {
    return CartModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return CartModel.findByIdAndDelete(id).exec();
  }
}
