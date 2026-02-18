import { Favorite } from "../interfaces/favorite.interface";

export class FavoriteHelper {
  static toResponse(favorite: Favorite & { _id?: string | any }): object {
    return {
      id: favorite._id?.toString?.() ?? undefined,
      userId: favorite.userId,
      productId: favorite.productId,
      createdAt: favorite.createdAt,
      updatedAt: favorite.updatedAt,
    };
  }
}
