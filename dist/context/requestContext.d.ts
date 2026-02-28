import { User } from "../entities/User";
export type RequestContext = {
    user?: User | null;
};
export declare const requestContext: {
    run: (ctx: RequestContext, fn: () => Promise<any> | void) => void | Promise<any>;
    get: () => RequestContext | undefined;
    getUser: () => User | null | undefined;
};
//# sourceMappingURL=requestContext.d.ts.map