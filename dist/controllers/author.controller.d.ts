import { Request, Response } from "express";
interface AuthorParams {
    id: string;
}
interface CreateAuthorBody {
    id: string;
    bio?: string | null;
    education?: string | null;
    expertise?: string | null;
    socialLinks?: any;
    profileImage?: string | null;
}
interface UpdateAuthorBody {
    bio?: string | null;
    education?: string | null;
    expertise?: string | null;
    socialLinks?: any;
    profileImage?: string | null;
}
export declare const fetchAuthors: (req: Request, res: Response) => Promise<void>;
export declare const fetchAuthor: (req: Request<AuthorParams>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const fetchAuthorWithPosts: (req: Request<AuthorParams>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createNewAuthor: (req: Request<{}, {}, CreateAuthorBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateExistingAuthor: (req: Request<AuthorParams, {}, UpdateAuthorBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteExistingAuthor: (req: Request<AuthorParams>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=author.controller.d.ts.map