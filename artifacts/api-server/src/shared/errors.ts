import type { ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";

export class HttpError extends Error {
  constructor(
    public readonly statusCode: 400 | 404 | 500,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: error.message,
      ...(error.details ?? {}),
    });
    return;
  }

  if (
    error instanceof SyntaxError &&
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 400
  ) {
    res.status(400).json({ error: "Request body contains invalid JSON" });
    return;
  }

  logger.error({ error, method: req.method, url: req.url }, "Unhandled request error");
  res.status(500).json({ error: "Unexpected server error" });
};

export function invalidIdentifier(message: string, field: string, value: string): HttpError {
  return new HttpError(400, message, { [field]: value });
}