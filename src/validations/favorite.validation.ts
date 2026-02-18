import { z } from "zod";

export class FavoriteValidation {
  static createSchema = z.object({
    userId: z.string().min(1),
    productId: z.string().min(1),
  });

  static updateSchema = z.object({
    userId: z.string().min(1).optional(),
    productId: z.string().min(1).optional(),
  });
}

export type CreateFavoriteInput = z.infer<typeof FavoriteValidation.createSchema>;
export type UpdateFavoriteInput = z.infer<typeof FavoriteValidation.updateSchema>;
