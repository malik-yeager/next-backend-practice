import { User } from "./User";
import { RolePermission } from "./RolePermission";
import { BaseEntity } from "./BaseEntity";
export declare class Role extends BaseEntity {
    id: string;
    role_name: string;
    description: string | null;
    users: User[];
    permissions: RolePermission[];
}
//# sourceMappingURL=Role.d.ts.map