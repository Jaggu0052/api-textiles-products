import { Order } from "../interfaces/order.interface";

export class OrderHelper {
  static toResponse(order: Order & { _id?: string | any }): object {
    return {
      id: order._id?.toString?.() ?? undefined,
      userId: order.userId,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
