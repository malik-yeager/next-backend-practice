import { Tag } from "../entities/Tag";
export declare const getAllTags: () => Promise<{
    id: any;
    name: any;
    slug: any;
    description: any;
    createdAt: any;
    updatedAt: any;
}[]>;
export declare const getTagById: (id: string) => Promise<{
    id: any;
    name: any;
    slug: any;
    description: any;
    createdAt: any;
    updatedAt: any;
} | null>;
export declare const createTag: (name: string, slug: string, description?: string | null) => Promise<Tag>;
export declare const updateTag: (id: string, name?: string | null, slug?: string | null, description?: string | null) => Promise<Tag>;
export declare const deleteTag: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=tag.service.d.ts.map