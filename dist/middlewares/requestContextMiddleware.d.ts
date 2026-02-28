import { Request, Response, NextFunction } from "express";
/**
 * Use this middleware early in your stack (after passport/session).
 * It binds the request lifecycle to AsyncLocalStorage so subscribers can access the user.
 */
export declare function requestContextMiddleware(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=requestContextMiddleware.d.ts.map