import { User } from "./User";
export declare class Account {
    id: string;
    type: string;
    provider: string;
    providerAccountId: string;
    password: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    user: User;
}
//# sourceMappingURL=Account.d.ts.map