// src/middleware/requestContextMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { requestContext } from "../context/requestContext";

/**
 * Use this middleware early in your stack (after passport/session).
 * It binds the request lifecycle to AsyncLocalStorage so subscribers can access the user.
 */
export function requestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  // wrap the request handling in the ALS context
  requestContext.run({ user: (req.user as any) || null }, () => next());
}
