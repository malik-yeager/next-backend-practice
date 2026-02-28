import { User } from "../entities/User";
export declare class AuthService {
    private userRepo;
    private accountRepo;
    registerUser(email: string, password: string, name?: string): Promise<User>;
}
//# sourceMappingURL=auth.service.d.ts.map