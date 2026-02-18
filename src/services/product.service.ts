import { ProductModel } from "../models/product.model";
import { CreateProductInput, UpdateProductInput } from "../validations/product.validation";

export class ProductService {
  static async create(input: CreateProductInput) {
    return ProductModel.create({
      ...input,
      inStock: input.inStock ?? true,
    });
  }

  static async list() {
    return ProductModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return ProductModel.findById(id).exec();
  }

  static async update(id: string, input: UpdateProductInput) {
    return ProductModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return ProductModel.findByIdAndDelete(id).exec();
  }
}
