import { User } from "./User";
export declare class AuditLog {
    id: string;
    user_id: string | null;
    user: User | null;
    action: string;
    entity_name: string | null;
    entity_id: string | null;
    details: Record<string, any> | null;
    endpoint: string | null;
    ip_address: string | null;
    created_at: Date;
}
//# sourceMappingURL=AuditLog.d.ts.map