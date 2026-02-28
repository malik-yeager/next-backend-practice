import { Request, Response } from "express";
export interface UserParams {
    id?: string;
}
export declare class UserController {
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request<UserParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateUser(req: Request<UserParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteUser(req: Request<UserParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=user.controller.d.ts.map