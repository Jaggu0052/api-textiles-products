import { StockModel } from "../models/stock.model";
import { CreateStockInput, UpdateStockInput } from "../validations/stock.validation";

export class StockService {
  static async create(input: CreateStockInput) {
    return StockModel.create(input);
  }

  static async list() {
    return StockModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return StockModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateStockInput) {
    return StockModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return StockModel.findByIdAndDelete(id).exec();
  }
}
