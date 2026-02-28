import { Request, Response } from "express";
export interface PostParams {
    id?: string;
}
export declare class PostController {
    getAllPosts(req: Request, res: Response): Promise<void>;
    getPostById(req: Request<PostParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getRelatedPosts(req: Request<PostParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createPost(req: Request, res: Response): Promise<void>;
    updatePost(req: Request<PostParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deletePost(req: Request<PostParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=post.controller.d.ts.map