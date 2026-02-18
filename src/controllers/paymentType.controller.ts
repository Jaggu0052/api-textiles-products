import { Request, Response, NextFunction } from "express";
import { PaymentTypeValidation } from "../validations/paymentType.validation";
import { PaymentTypeService } from "../services/paymentType.service";
import { PaymentTypeHelper } from "../helpers/paymentType.helper";
import { messages } from "../messages";

export class PaymentTypeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = PaymentTypeValidation.createSchema.parse(req.body);
      const paymentType = await PaymentTypeService.create(input);
      res.status(201).json({ message: messages.paymentType.created, data: PaymentTypeHelper.toResponse(paymentType as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const paymentTypes = await PaymentTypeService.list();
      res.json({ message: messages.paymentType.listed, data: paymentTypes.map((p) => PaymentTypeHelper.toResponse(p as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentType = await PaymentTypeService.getById(req.params.id);
      if (!paymentType) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.paymentType.fetched, data: PaymentTypeHelper.toResponse(paymentType as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = PaymentTypeValidation.updateSchema.parse(req.body);
      const paymentType = await PaymentTypeService.update(req.params.id, input);
      if (!paymentType) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.paymentType.updated, data: PaymentTypeHelper.toResponse(paymentType as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentType = await PaymentTypeService.remove(req.params.id);
      if (!paymentType) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.paymentType.deleted, data: PaymentTypeHelper.toResponse(paymentType as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
