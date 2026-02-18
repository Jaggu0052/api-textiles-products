export interface User {
  name: string;
  email: string;
  passwordHash: string;
  userTypeId?: string;
  token?: string;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
