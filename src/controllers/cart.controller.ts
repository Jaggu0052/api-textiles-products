import { Request, Response, NextFunction } from "express";
import { CartValidation } from "../validations/cart.validation";
import { CartService } from "../services/cart.service";
import { CartHelper } from "../helpers/cart.helper";
import { messages } from "../messages";

export class CartController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CartValidation.createSchema.parse(req.body);
      const cart = await CartService.create(input);
      res.status(201).json({ message: messages.cart.created, data: CartHelper.toResponse(cart as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const carts = await CartService.list();
      res.json({ message: messages.cart.listed, data: carts.map((c) => CartHelper.toResponse(c as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await CartService.getById(req.params.id);
      if (!cart) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.cart.fetched, data: CartHelper.toResponse(cart as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CartValidation.updateSchema.parse(req.body);
      const cart = await CartService.update(req.params.id, input);
      if (!cart) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.cart.updated, data: CartHelper.toResponse(cart as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await CartService.remove(req.params.id);
      if (!cart) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.cart.deleted, data: CartHelper.toResponse(cart as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
