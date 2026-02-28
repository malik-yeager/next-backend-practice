import { Account } from "./Account";
import { Session } from "./Session";
import { Role } from "./Role";
import { BaseEntity } from "./BaseEntity";
export declare class User extends BaseEntity {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    social_links: Record<string, string> | null;
    roleId: string | null;
    role: Role | null;
    accounts: Account[];
    sessions: Session[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map