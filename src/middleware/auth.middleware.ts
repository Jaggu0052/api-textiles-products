import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { AuthService } from "../services/auth.service";

export interface AuthTokenPayload {
  userId: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: AuthTokenPayload;
  newToken?: string;
  newRefreshToken?: string;
}

const jwtSecret = process.env.JWT_SECRET ?? "";

export async function authRequired(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing or invalid Authorization header" });
      return;
    }

    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET is not set" });
      return;
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const payload = jwt.verify(token, jwtSecret) as AuthTokenPayload;
    req.user = payload;

    // Check if token will expire within 1 day (86400 seconds)
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = (payload.exp ?? 0) - now;
    const ONE_DAY_IN_SECONDS = 86400;

    if (timeRemaining < ONE_DAY_IN_SECONDS && timeRemaining > 0) {
      // Token expires within 1 day, refresh it
      try {
        const user = await UserModel.findById(payload.userId).exec();
        if (user && user.refreshToken) {
          // Call refreshAccessToken to get new tokens
          const refreshResult = await AuthService.refreshAccessToken(user.refreshToken);
          req.newToken = refreshResult.token;
          if (refreshResult.refreshToken) {
            req.newRefreshToken = refreshResult.refreshToken;
          }
        }
      } catch (refreshErr) {
        // If refresh fails, continue with current token
        console.warn("Token refresh failed:", refreshErr);
      }
    }

    next();
  } catch (_err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
