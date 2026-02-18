import { z } from "zod";

export class PaymentTypeValidation {
  static createSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  });

  static updateSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
  });
}

export type CreatePaymentTypeInput = z.infer<typeof PaymentTypeValidation.createSchema>;
export type UpdatePaymentTypeInput = z.infer<typeof PaymentTypeValidation.updateSchema>;
