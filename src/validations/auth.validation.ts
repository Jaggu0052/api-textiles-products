import { z } from "zod";

export class AuthValidation {
  static loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
}

export type LoginInput = z.infer<typeof AuthValidation.loginSchema>;
