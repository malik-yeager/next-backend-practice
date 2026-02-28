import { Request, Response } from "express";
export declare class DraftController {
    createDraft(req: Request, res: Response): Promise<void>;
    getAllDrafts(req: Request, res: Response): Promise<void>;
    getDraftById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateDraft(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    publishDraft(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=draft.controller.d.ts.map