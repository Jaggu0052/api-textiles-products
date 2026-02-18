import { z } from "zod";

export class ProductValidation {
  static createSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    imageUrl: z.string().url().optional(),
    inStock: z.boolean().optional(),
  });

  static updateSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    imageUrl: z.string().url().optional(),
    inStock: z.boolean().optional(),
  });
}

export type CreateProductInput = z.infer<typeof ProductValidation.createSchema>;
export type UpdateProductInput = z.infer<typeof ProductValidation.updateSchema>;
