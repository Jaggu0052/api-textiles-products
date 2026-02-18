import { z } from "zod";

export class StockValidation {
  static createSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().int().nonnegative(),
    location: z.string().optional(),
  });

  static updateSchema = z.object({
    productId: z.string().min(1).optional(),
    quantity: z.number().int().nonnegative().optional(),
    location: z.string().optional(),
  });
}

export type CreateStockInput = z.infer<typeof StockValidation.createSchema>;
export type UpdateStockInput = z.infer<typeof StockValidation.updateSchema>;
