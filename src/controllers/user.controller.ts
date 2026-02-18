import { Request, Response, NextFunction } from "express";
import { UserValidation } from "../validations/user.validation";
import { UserService } from "../services/user.service";
import { UserHelper } from "../helpers/user.helper";
import { messages } from "../messages";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiResponseHandler } from "../helpers/apiResponse";
import { CustomError } from "../helpers/customError";

export class UserController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const input = UserValidation.createSchema.parse(req.body);
      const user = await UserService.create(input);
      const response = ApiResponseHandler.success(
        messages.user.created,
        UserHelper.toResponse(user as any),
        201
      );
      
      if (req.newToken) {
        (response as any).token = req.newToken;
      }
      if (req.newRefreshToken) {
        (response as any).refreshToken = req.newRefreshToken;
      }
      
      res.status(201).json(response);
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await UserService.list();
      const response = ApiResponseHandler.success(
        messages.user.listed,
        users.map((u) => UserHelper.toResponse(u as any)),
        200
      );
      
      if (req.newToken) {
        (response as any).token = req.newToken;
      }
      if (req.newRefreshToken) {
        (response as any).refreshToken = req.newRefreshToken;
      }
      
      res.json(response);
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      const response = ApiResponseHandler.success(
        messages.user.fetched,
        UserHelper.toResponse(user as any),
        200
      );
      
      if (req.newToken) {
        (response as any).token = req.newToken;
      }
      if (req.newRefreshToken) {
        (response as any).refreshToken = req.newRefreshToken;
      }
      
      res.json(response);
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const input = UserValidation.updateSchema.parse(req.body);
      const user = await UserService.update(req.params.id, input);
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      const response = ApiResponseHandler.success(
        messages.user.updated,
        UserHelper.toResponse(user as any),
        200
      );
      
      if (req.newToken) {
        (response as any).token = req.newToken;
      }
      if (req.newRefreshToken) {
        (response as any).refreshToken = req.newRefreshToken;
      }
      
      res.json(response);
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.remove(req.params.id);
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      const response = ApiResponseHandler.success(
        messages.user.deleted,
        null,
        200
      );
      
      if (req.newToken) {
        (response as any).token = req.newToken;
      }
      if (req.newRefreshToken) {
        (response as any).refreshToken = req.newRefreshToken;
      }
      
      res.json(response);
    } catch (err) {
      next(err as Error);
    }
  }
}
