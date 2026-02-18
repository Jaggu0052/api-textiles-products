import { Request, Response, NextFunction } from "express";
import { PaymentValidation } from "../validations/payment.validation";
import { PaymentService } from "../services/payment.service";
import { PaymentHelper } from "../helpers/payment.helper";
import { messages } from "../messages";

export class PaymentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = PaymentValidation.createSchema.parse(req.body);
      const payment = await PaymentService.create(input);
      res.status(201).json({ message: messages.payment.created, data: PaymentHelper.toResponse(payment as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await PaymentService.list();
      res.json({ message: messages.payment.listed, data: payments.map((p) => PaymentHelper.toResponse(p as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.getById(req.params.id);
      if (!payment) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.payment.fetched, data: PaymentHelper.toResponse(payment as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = PaymentValidation.updateSchema.parse(req.body);
      const payment = await PaymentService.update(req.params.id, input);
      if (!payment) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.payment.updated, data: PaymentHelper.toResponse(payment as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.remove(req.params.id);
      if (!payment) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.payment.deleted, data: PaymentHelper.toResponse(payment as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
