import { Cart } from "../interfaces/cart.interface";

export class CartHelper {
  static toResponse(cart: Cart & { _id?: string | any }): object {
    return {
      id: cart._id?.toString?.() ?? undefined,
      userId: cart.userId,
      items: cart.items,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}
