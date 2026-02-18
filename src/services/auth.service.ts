import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new Error("Invalid credentials");
    }

    const jwtSecret = process.env.JWT_SECRET ?? "";
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not set");
    }

    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET ?? "";
    if (!jwtRefreshSecret) {
      throw new Error("JWT_REFRESH_SECRET is not set");
    }

    // Generate access token (expires in 1 hour)
    const token = jwt.sign(
      { userId: user._id.toString(), name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    // Generate refresh token (expires in 7 days)
    const refreshToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      jwtRefreshSecret,
      { expiresIn: "7d" }
    );

    // Calculate refresh token expiration date (7 days from now)
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

    // Update user with tokens
    await UserModel.findByIdAndUpdate(user._id, {
      token,
      refreshToken,
      refreshTokenExpiresAt,
    }).exec();

    return { token, refreshToken };
  }

  static async refreshAccessToken(refreshToken: string) {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET ?? "";
    if (!jwtRefreshSecret) {
      throw new Error("JWT_REFRESH_SECRET is not set");
    }

    const jwtSecret = process.env.JWT_SECRET ?? "";
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not set");
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as {
        userId: string;
        email: string;
      };

      // Find user and verify refresh token matches
      const user = await UserModel.findById(decoded.userId).exec();
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      // Check if refresh token is expired
      if (
        user.refreshTokenExpiresAt &&
        user.refreshTokenExpiresAt < new Date()
      ) {
        throw new Error("Refresh token expired");
      }

      // Generate new access token
      const newToken = jwt.sign(
        { userId: user._id.toString(), name: user.name, email: user.email },
        jwtSecret,
        { expiresIn: "1h" }
      );

      // Check if refresh token expires within 6 days
      const now = new Date();
      const sixDaysFromNow = new Date();
      sixDaysFromNow.setDate(sixDaysFromNow.getDate() + 6);

      let updateData: any = { token: newToken };

      if (
        user.refreshTokenExpiresAt &&
        user.refreshTokenExpiresAt <= sixDaysFromNow
      ) {
        // Generate new refresh token (expires in 7 days)
        const newRefreshToken = jwt.sign(
          { userId: user._id.toString(), email: user.email },
          jwtRefreshSecret,
          { expiresIn: "7d" }
        );

        // Calculate new refresh token expiration date (7 days from now)
        const newRefreshTokenExpiresAt = new Date();
        newRefreshTokenExpiresAt.setDate(newRefreshTokenExpiresAt.getDate() + 7);

        updateData.refreshToken = newRefreshToken;
        updateData.refreshTokenExpiresAt = newRefreshTokenExpiresAt;
      }

      // Update user with new token(s)
      await UserModel.findByIdAndUpdate(user._id, updateData).exec();

      // Return response with refresh token if generated
      const response: any = { token: newToken };
      if (updateData.refreshToken) {
        response.refreshToken = updateData.refreshToken;
      }

      return response;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}
