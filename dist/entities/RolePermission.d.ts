import { Role } from "./Role";
import { ModulePermission } from "./ModulePermission";
export declare class RolePermission {
    id: string;
    role: Role;
    modulePermission: ModulePermission;
    module_name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    fullAccess: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=RolePermission.d.ts.map