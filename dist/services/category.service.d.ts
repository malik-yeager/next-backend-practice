import { Category } from "../entities/Category";
export declare const getAllCategories: () => Promise<{
    id: any;
    name: any;
    slug: any;
    description: any;
    createdAt: any;
    updatedAt: any;
}[]>;
export declare const getCategoryById: (id: string) => Promise<{
    id: any;
    name: any;
    slug: any;
    description: any;
    createdAt: any;
    updatedAt: any;
} | null>;
export declare const createCategory: (name: string, slug: string, description?: string | null) => Promise<Category>;
export declare const updateCategory: (id: string, name?: string | null, slug?: string | null, description?: string | null) => Promise<Category>;
export declare const deleteCategory: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=category.service.d.ts.map