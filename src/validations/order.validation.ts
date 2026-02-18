import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
  price: z.number().nonnegative(),
});

export class OrderValidation {
  static createSchema = z.object({
    userId: z.string().min(1),
    items: z.array(orderItemSchema),
    totalAmount: z.number().nonnegative(),
    status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]).optional(),
  });

  static updateSchema = z.object({
    userId: z.string().min(1).optional(),
    items: z.array(orderItemSchema).optional(),
    totalAmount: z.number().nonnegative().optional(),
    status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]).optional(),
  });
}

export type CreateOrderInput = z.infer<typeof OrderValidation.createSchema>;
export type UpdateOrderInput = z.infer<typeof OrderValidation.updateSchema>;
