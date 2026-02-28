"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContext = void 0;
// src/context/requestContext.ts
const async_hooks_1 = require("async_hooks");
const als = new async_hooks_1.AsyncLocalStorage();
exports.requestContext = {
    run: (ctx, fn) => als.run(ctx, fn),
    get: () => als.getStore(),
    getUser: () => als.getStore()?.user,
};
//# sourceMappingURL=requestContext.js.map