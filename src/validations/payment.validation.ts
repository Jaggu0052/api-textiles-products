import { z } from "zod";

export class PaymentValidation {
  static createSchema = z.object({
    orderId: z.string().min(1),
    amount: z.number().nonnegative(),
    paymentTypeId: z.string().optional(),
    status: z.enum(["pending", "paid", "failed"]).optional(),
    reference: z.string().optional(),
  });

  static updateSchema = z.object({
    orderId: z.string().min(1).optional(),
    amount: z.number().nonnegative().optional(),
    paymentTypeId: z.string().optional(),
    status: z.enum(["pending", "paid", "failed"]).optional(),
    reference: z.string().optional(),
  });
}

export type CreatePaymentInput = z.infer<typeof PaymentValidation.createSchema>;
export type UpdatePaymentInput = z.infer<typeof PaymentValidation.updateSchema>;
