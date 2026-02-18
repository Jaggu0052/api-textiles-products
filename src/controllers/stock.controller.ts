import { Request, Response, NextFunction } from "express";
import { StockValidation } from "../validations/stock.validation";
import { StockService } from "../services/stock.service";
import { StockHelper } from "../helpers/stock.helper";
import { messages } from "../messages";

export class StockController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = StockValidation.createSchema.parse(req.body);
      const stock = await StockService.create(input);
      res.status(201).json({ message: messages.stock.created, data: StockHelper.toResponse(stock as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const stocks = await StockService.list();
      res.json({ message: messages.stock.listed, data: stocks.map((s) => StockHelper.toResponse(s as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await StockService.getById(req.params.id);
      if (!stock) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.stock.fetched, data: StockHelper.toResponse(stock as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = StockValidation.updateSchema.parse(req.body);
      const stock = await StockService.update(req.params.id, input);
      if (!stock) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.stock.updated, data: StockHelper.toResponse(stock as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await StockService.remove(req.params.id);
      if (!stock) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.stock.deleted, data: StockHelper.toResponse(stock as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
