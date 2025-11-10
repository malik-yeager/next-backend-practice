// src/context/requestContext.ts
import { AsyncLocalStorage } from "async_hooks";
import { User } from "../entities/User";

export type RequestContext = {
  user?: User | null;
  // add other per-request values if you want
};

const als = new AsyncLocalStorage<RequestContext>();

export const requestContext = {
  run: (ctx: RequestContext, fn: () => Promise<any> | void) => als.run(ctx, fn),
  get: (): RequestContext | undefined => als.getStore(),
  getUser: (): User | null | undefined => als.getStore()?.user,
};
