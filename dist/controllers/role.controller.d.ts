import { Request, Response } from "express";
export interface RoleParams {
    id?: string;
}
export declare class RoleController {
    getAllRoles(req: Request, res: Response): Promise<void>;
    getRoleById(req: Request<RoleParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateRole(req: Request<RoleParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRole(req: Request<RoleParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=role.controller.d.ts.map