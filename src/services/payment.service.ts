import { PaymentModel } from "../models/payment.model";
import { CreatePaymentInput, UpdatePaymentInput } from "../validations/payment.validation";

export class PaymentService {
  static async create(input: CreatePaymentInput) {
    return PaymentModel.create({
      ...input,
      status: input.status ?? "pending",
    });
  }

  static async list() {
    return PaymentModel.find().sort({ createdAt: -1 }).exec();
  }

  static async getById(id: string) {
    return PaymentModel.findById(id).exec();
  }

  static async update(id: string, input: UpdatePaymentInput) {
    return PaymentModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  static async remove(id: string) {
    return PaymentModel.findByIdAndDelete(id).exec();
  }
}
