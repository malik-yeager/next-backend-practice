import { Post } from "../entities/Post";
export declare const getAllPosts: () => Promise<Post[]>;
export declare const getRelatedPosts: (id: string) => Promise<Post[]>;
export declare const getPostById: (id: string) => Promise<Post | null>;
export declare const createPost: (data: Partial<Post>) => Promise<Post>;
export declare const updatePost: (id: string, data: Partial<Post>) => Promise<Post>;
export declare const deletePost: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=post.service.d.ts.map