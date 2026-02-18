import { Request, Response, NextFunction } from "express";
import { FavoriteValidation } from "../validations/favorite.validation";
import { FavoriteService } from "../services/favorite.service";
import { FavoriteHelper } from "../helpers/favorite.helper";
import { messages } from "../messages";

export class FavoriteController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = FavoriteValidation.createSchema.parse(req.body);
      const favorite = await FavoriteService.create(input);
      res.status(201).json({ message: messages.favorite.created, data: FavoriteHelper.toResponse(favorite as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const favorites = await FavoriteService.list();
      res.json({ message: messages.favorite.listed, data: favorites.map((f) => FavoriteHelper.toResponse(f as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const favorite = await FavoriteService.getById(req.params.id);
      if (!favorite) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.favorite.fetched, data: FavoriteHelper.toResponse(favorite as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = FavoriteValidation.updateSchema.parse(req.body);
      const favorite = await FavoriteService.update(req.params.id, input);
      if (!favorite) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.favorite.updated, data: FavoriteHelper.toResponse(favorite as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const favorite = await FavoriteService.remove(req.params.id);
      if (!favorite) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.favorite.deleted, data: FavoriteHelper.toResponse(favorite as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
