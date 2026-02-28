import { User } from "./User";
export declare abstract class BaseEntity {
    created_by: string | null;
    createdBy: User | null;
    updated_by: string | null;
    updatedBy: User | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
//# sourceMappingURL=BaseEntity.d.ts.map