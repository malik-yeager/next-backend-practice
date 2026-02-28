"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextMiddleware = requestContextMiddleware;
const requestContext_1 = require("../context/requestContext");
/**
 * Use this middleware early in your stack (after passport/session).
 * It binds the request lifecycle to AsyncLocalStorage so subscribers can access the user.
 */
function requestContextMiddleware(req, res, next) {
    // wrap the request handling in the ALS context
    requestContext_1.requestContext.run({ user: req.user || null }, () => next());
}
//# sourceMappingURL=requestContextMiddleware.js.map