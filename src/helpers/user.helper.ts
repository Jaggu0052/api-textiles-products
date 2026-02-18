import { User } from "../interfaces/user.interface";

export class UserHelper {
  static toResponse(user: User & { _id?: string | any }): object {
    return {
      id: user._id?.toString?.() ?? undefined,
      name: user.name,
      email: user.email,
      userTypeId: user.userTypeId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
