import { Request, Response, NextFunction } from "express";
import { AuthValidation } from "../validations/auth.validation";
import { AuthService } from "../services/auth.service";
import { messages } from "../messages";
import { ApiResponseHandler } from "../helpers/apiResponse";
import { CustomError } from "../helpers/customError";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const input = AuthValidation.loginSchema.parse(req.body);
      const result = await AuthService.login(input.email, input.password);
      const response = ApiResponseHandler.success(
        messages.auth.login,
        {
          token: result.token,
          refreshToken: result.refreshToken,
        },
        200
      );
      res.status(200).json(response);
    } catch (err) {
      if (err instanceof Error && err.message === "Invalid credentials") {
        next(new CustomError("Invalid email or password", 401));
      } else {
        next(err as Error);
      }
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new CustomError("Refresh token is required", 400);
      }
      const result = await AuthService.refreshAccessToken(refreshToken);
      const responseData: any = { token: result.token };
      if (result.refreshToken) {
        responseData.refreshToken = result.refreshToken;
      }
      const response = ApiResponseHandler.success(
        "Token refreshed successfully",
        responseData,
        200
      );
      res.status(200).json(response);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Invalid refresh token")) {
        next(new CustomError("Invalid or expired refresh token", 401));
      } else {
        next(err as Error);
      }
    }
  }
}
