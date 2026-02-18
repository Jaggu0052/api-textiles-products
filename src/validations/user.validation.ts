import { z } from "zod";

export class UserValidation {
  static createSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    userTypeId: z.string().optional(),
    passwordHash: z.string().optional(),
    token: z.string().optional(),
    refreshToken: z.string().optional(),
    refreshTokenExpiresAt: z.date().optional(),
  });

  static updateSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    userTypeId: z.string().optional(),
    passwordHash: z.string().optional(),
    token: z.string().optional(),
    refreshToken: z.string().optional(),
    refreshTokenExpiresAt: z.date().optional(),
  });
}

export type CreateUserInput = z.infer<typeof UserValidation.createSchema>;
export type UpdateUserInput = z.infer<typeof UserValidation.updateSchema>;
