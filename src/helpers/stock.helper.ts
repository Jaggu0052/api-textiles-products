import { Stock } from "../interfaces/stock.interface";

export class StockHelper {
  static toResponse(stock: Stock & { _id?: string | any }): object {
    return {
      id: stock._id?.toString?.() ?? undefined,
      productId: stock.productId,
      quantity: stock.quantity,
      location: stock.location,
      createdAt: stock.createdAt,
      updatedAt: stock.updatedAt,
    };
  }
}
