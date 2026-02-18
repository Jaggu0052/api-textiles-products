import { NextFunction, Request, Response } from "express";
import { logError } from "./logger";
import { CustomError } from "./customError";
import { ApiResponseHandler } from "./apiResponse";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logError(err.message);

  // Handle custom errors
  if (err instanceof CustomError) {
    const response = ApiResponseHandler.error(
      err.message,
      err.statusCode,
      err.errorCode
    );
    res.status(err.statusCode).json(response);
    return;
  }

  // Handle validation errors (Zod)
  if (err.message.includes("Validation error") || err.name === "ZodError") {
    const response = ApiResponseHandler.error(
      "Validation error",
      400,
      err.message
    );
    res.status(400).json(response);
    return;
  }

  // Handle JWT errors
  if (err.message.includes("jwt")) {
    const response = ApiResponseHandler.error(
      "Invalid or expired token",
      401,
      err.message
    );
    res.status(401).json(response);
    return;
  }

  // Default error response
  const response = ApiResponseHandler.error(
    "Internal Server Error",
    500,
    err.message
  );
  res.status(500).json(response);
}
