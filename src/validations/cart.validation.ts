import { z } from "zod";

const itemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
});

export class CartValidation {
  static createSchema = z.object({
    userId: z.string().min(1),
    items: z.array(itemSchema).optional(),
  });

  static updateSchema = z.object({
    userId: z.string().min(1).optional(),
    items: z.array(itemSchema).optional(),
  });
}

export type CreateCartInput = z.infer<typeof CartValidation.createSchema>;
export type UpdateCartInput = z.infer<typeof CartValidation.updateSchema>;
