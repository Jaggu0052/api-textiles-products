import { PaymentTypeModel } from "../models/paymentType.model";
import { CreatePaymentTypeInput, UpdatePaymentTypeInput } from "../validations/paymentType.validation";

export class PaymentTypeService {
  static async create(input: CreatePaymentTypeInput) {
    return PaymentTypeModel.create(input);
  }

  static async list() {
    return PaymentTypeModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return PaymentTypeModel.findById(id).exec();
  }

  static async update(id: string, input: UpdatePaymentTypeInput) {
    return PaymentTypeModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return PaymentTypeModel.findByIdAndDelete(id).exec();
  }
}
