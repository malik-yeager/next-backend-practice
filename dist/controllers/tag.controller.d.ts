import { Request, Response } from "express";
export interface TagParams {
    id?: string;
}
export declare class TagController {
    getAllTags(req: Request, res: Response): Promise<void>;
    getTagById(req: Request<TagParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createTag(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateTag(req: Request<TagParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteTag(req: Request<TagParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=tag.controller.d.ts.map