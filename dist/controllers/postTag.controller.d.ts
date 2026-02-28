import { Request, Response } from "express";
export declare const fetchPostTags: (req: Request, res: Response) => Promise<void>;
export declare const fetchPostTag: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createNewPostTag: (req: Request, res: Response) => Promise<void>;
export declare const deleteExistingPostTag: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=postTag.controller.d.ts.map