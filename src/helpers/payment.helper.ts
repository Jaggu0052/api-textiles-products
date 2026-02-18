import { Payment } from "../interfaces/payment.interface";

export class PaymentHelper {
  static toResponse(payment: Payment & { _id?: string | any }): object {
    return {
      id: payment._id?.toString?.() ?? undefined,
      orderId: payment.orderId,
      amount: payment.amount,
      paymentTypeId: payment.paymentTypeId,
      status: payment.status,
      reference: payment.reference,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
