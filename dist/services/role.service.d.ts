export declare const getAllRoles: () => Promise<{
    id: string;
    role_name: string;
    description: string | null;
    permissions: Record<string, string[]>;
}[]>;
export declare const getRoleById: (id: string) => Promise<{
    id: string;
    role_name: string;
    description: string | null;
    permissions: Record<string, string[]>;
} | null>;
export declare const createRole: (role_name: string, permissions?: Record<string, string[]>, description?: string) => Promise<{
    id: string;
    role_name: string;
    description: string | null;
    permissions: Record<string, string[]>;
}>;
export declare const updateRole: (id: string, role_name?: string, description?: string, permissions?: Record<string, string[]>) => Promise<{
    id: string;
    role_name: string;
    description: string | null;
    permissions: Record<string, string[]>;
}>;
export declare const deleteRole: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=role.service.d.ts.map