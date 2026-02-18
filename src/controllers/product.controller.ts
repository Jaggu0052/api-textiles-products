import { Request, Response, NextFunction } from "express";
import { ProductValidation } from "../validations/product.validation";
import { ProductService } from "../services/product.service";
import { ProductHelper } from "../helpers/product.helper";
import { messages } from "../messages";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = ProductValidation.createSchema.parse(req.body);
      const product = await ProductService.create(input);
      res.status(201).json({ message: messages.product.created, data: ProductHelper.toResponse(product as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.list();
      res.json({ message: messages.product.listed, data: products.map((p) => ProductHelper.toResponse(p as any)) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.product.fetched, data: ProductHelper.toResponse(product as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = ProductValidation.updateSchema.parse(req.body);
      const product = await ProductService.update(req.params.id, input);
      if (!product) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.product.updated, data: ProductHelper.toResponse(product as any) });
    } catch (err) {
      next(err as Error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.remove(req.params.id);
      if (!product) {
        res.status(404).json({ message: messages.common.notFound });
        return;
      }
      res.json({ message: messages.product.deleted, data: ProductHelper.toResponse(product as any) });
    } catch (err) {
      next(err as Error);
    }
  }
}
