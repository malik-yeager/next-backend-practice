import { RolePermission } from "./RolePermission";
export declare class ModulePermission {
    id: string;
    module_name: string;
    description: string | null;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    fullAccess: boolean;
    rolePermissions: RolePermission[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ModulePermission.d.ts.map