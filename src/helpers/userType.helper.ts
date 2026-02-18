import { UserType } from "../interfaces/userType.interface";

export class UserTypeHelper {
  static toResponse(userType: UserType & { _id?: string | any }): object {
    return {
      id: userType._id?.toString?.() ?? undefined,
      name: userType.name,
      description: userType.description,
      createdAt: userType.createdAt,
      updatedAt: userType.updatedAt,
    };
  }
}
