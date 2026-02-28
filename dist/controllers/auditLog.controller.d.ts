import { Request, Response } from "express";
export declare class AuditLogController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    clearAll(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=auditLog.controller.d.ts.map