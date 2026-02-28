export declare const getAllPostTags: () => Promise<any[]>;
export declare const getPostTagById: (postId: string, tagId: number) => Promise<any>;
export declare const createPostTag: (postId: string, tagId: number) => Promise<any>;
export declare const deletePostTag: (postId: string, tagId: number) => Promise<{
    message: string;
}>;
//# sourceMappingURL=postTag.service.d.ts.map