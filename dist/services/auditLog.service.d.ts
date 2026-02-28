import { AuditLog } from "../entities/AuditLog";
export declare const getAllAuditLogs: (page?: number, limit?: number, search?: string) => Promise<{
    data: AuditLog[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare const getAuditLogById: (id: string) => Promise<AuditLog>;
export declare const deleteAuditLog: (id: string) => Promise<{
    message: string;
}>;
export declare const clearAllAuditLogs: () => Promise<{
    message: string;
}>;
//# sourceMappingURL=auditLog.service.d.ts.map