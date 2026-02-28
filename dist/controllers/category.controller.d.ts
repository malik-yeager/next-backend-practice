import { Request, Response } from "express";
export interface CategoryParams {
    id?: string;
}
export declare class CategoryController {
    getAllCategories(req: Request, res: Response): Promise<void>;
    getCategoryById(req: Request<CategoryParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateCategory(req: Request<CategoryParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteCategory(req: Request<CategoryParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=category.controller.d.ts.map