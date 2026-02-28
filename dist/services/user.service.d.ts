import { User } from "../entities/User";
export declare const getAllUsers: () => Promise<{
    id: any;
    name: any;
    email: any;
    emailVerified: any;
    image: any;
    role_name: any;
    createdAt: any;
    updatedAt: any;
}[]>;
export declare const getUserById: (id: string) => Promise<{
    id: any;
    name: any;
    email: any;
    emailVerified: any;
    image: any;
    role_name: any;
    createdAt: any;
    updatedAt: any;
} | null>;
export declare const createUser: (name: string, email: string, roleId?: string | null, bio?: string | null, social_links?: Record<string, string> | null) => Promise<User>;
export declare const updateUser: (id: string, name?: string | null, email?: string | null, roleId?: string | null, bio?: string | null, social_links?: Record<string, string> | null) => Promise<User>;
export declare const deleteUser: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map