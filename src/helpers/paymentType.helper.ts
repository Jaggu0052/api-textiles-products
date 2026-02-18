import { PaymentType } from "../interfaces/paymentType.interface";

export class PaymentTypeHelper {
  static toResponse(paymentType: PaymentType & { _id?: string | any }): object {
    return {
      id: paymentType._id?.toString?.() ?? undefined,
      name: paymentType.name,
      description: paymentType.description,
      createdAt: paymentType.createdAt,
      updatedAt: paymentType.updatedAt,
    };
  }
}
