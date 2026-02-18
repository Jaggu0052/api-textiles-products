import { OrderModel } from "../models/order.model";
import { CreateOrderInput, UpdateOrderInput } from "../validations/order.validation";

export class OrderService {
  static async create(input: CreateOrderInput) {
    return OrderModel.create({
      ...input,
      status: input.status ?? "pending",
    });
  }

  static async list() {
    return OrderModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return OrderModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateOrderInput) {
    return OrderModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return OrderModel.findByIdAndDelete(id).exec();
  }
}
