import { Request, Response } from "express";
export declare const fetchPostViews: (req: Request, res: Response) => Promise<void>;
export declare const fetchPostView: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createNewPostView: (req: Request, res: Response) => Promise<void>;
export declare const updateExistingPostView: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteExistingPostView: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=postView.controller.d.ts.map