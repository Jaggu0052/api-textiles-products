import { Request, Response, NextFunction } from "express";
import { UserTypeValidation } from "../validations/userType.validation";
import { UserTypeService } from "../services/userType.service";
import { UserTypeHelper } from "../helpers/userType.helper";
import { messages } from "../messages";

export class UserTypeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = UserTypeValidation.createSchema.parse(req.body);
      const userType = await UserTypeService.create(input);
      res.status(201).json({ message: messages.userType.created, data: UserTypeHelper.toResponse(userType as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const userTypes = await UserTypeService.list();
      res.json({ message: messages.userType.listed, data: userTypes.map((u) => UserTypeHelper.toResponse(u as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userType = await UserTypeService.getById(req.params.id);
      if (!userType) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.userType.fetched, data: UserTypeHelper.toResponse(userType as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = UserTypeValidation.updateSchema.parse(req.body);
      const userType = await UserTypeService.update(req.params.id, input);
      if (!userType) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.userType.updated, data: UserTypeHelper.toResponse(userType as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const userType = await UserTypeService.remove(req.params.id);
      if (!userType) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.userType.deleted, data: UserTypeHelper.toResponse(userType as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
