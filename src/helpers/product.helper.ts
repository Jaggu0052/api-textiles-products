import { Product } from "../interfaces/product.interface";

export class ProductHelper {
  static toResponse(product: Product & { _id?: string | any }): object {
    return {
      id: product._id?.toString?.() ?? undefined,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
