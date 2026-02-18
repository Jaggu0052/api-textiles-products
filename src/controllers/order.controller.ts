import { Request, Response, NextFunction } from "express";
import { OrderValidation } from "../validations/order.validation";
import { OrderService } from "../services/order.service";
import { OrderHelper } from "../helpers/order.helper";
import { messages } from "../messages";

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = OrderValidation.createSchema.parse(req.body);
      const order = await OrderService.create(input);
      res.status(201).json({ message: messages.order.created, data: OrderHelper.toResponse(order as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderService.list();
      res.json({ message: messages.order.listed, data: orders.map((o) => OrderHelper.toResponse(o as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.getById(req.params.id);
      if (!order) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.order.fetched, data: OrderHelper.toResponse(order as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = OrderValidation.updateSchema.parse(req.body);
      const order = await OrderService.update(req.params.id, input);
      if (!order) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.order.updated, data: OrderHelper.toResponse(order as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.remove(req.params.id);
      if (!order) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.order.deleted, data: OrderHelper.toResponse(order as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
