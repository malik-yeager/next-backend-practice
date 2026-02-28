export declare const getAllPostViews: () => Promise<any[]>;
export declare const getPostViewById: (id: string) => Promise<any>;
export declare const createPostView: (postId: string, userId: string | null) => Promise<any>;
export declare const updatePostView: (id: string, postId: string, userId: string | null) => Promise<any>;
export declare const deletePostView: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=postView.services.d.ts.map