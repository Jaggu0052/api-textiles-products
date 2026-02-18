import { z } from "zod";

export class UserTypeValidation {
  static createSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  });

  static updateSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
  });
}

export type CreateUserTypeInput = z.infer<typeof UserTypeValidation.createSchema>;
export type UpdateUserTypeInput = z.infer<typeof UserTypeValidation.updateSchema>;
