export declare const getAllAuthors: () => Promise<any[]>;
export declare const getAuthorById: (id: string) => Promise<any>;
export declare const getAuthorWithPosts: (id: string) => Promise<any>;
export declare const createAuthor: (id: string, bio: string | null, education: string | null, expertise: string | null, socialLinks: any | null, profileImage: string | null) => Promise<any>;
export declare const updateAuthor: (id: string, bio: string | null, education: string | null, expertise: string | null, socialLinks: any | null, profileImage: string | null) => Promise<any>;
export declare const deleteAuthor: (id: string) => Promise<{
    message: string;
} | null>;
//# sourceMappingURL=author.service.d.ts.map