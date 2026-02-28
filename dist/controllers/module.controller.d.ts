import { Request, Response } from "express";
export interface ModuleParams {
    id?: string;
}
export declare class ModuleController {
    getAllModules(req: Request, res: Response): Promise<void>;
    getModuleById(req: Request<ModuleParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createModule(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateModule(req: Request<ModuleParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteModule(req: Request<ModuleParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=module.controller.d.ts.map