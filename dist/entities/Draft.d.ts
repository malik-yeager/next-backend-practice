import { User } from "./User";
import { BaseEntity } from "./BaseEntity";
export declare class Draft extends BaseEntity {
    id: string;
    title: string | null;
    slug: string | null;
    excerpt: string | null;
    content: Record<string, any> | null;
    author_id: string | null;
    author: User | null;
    meta: Record<string, any> | null;
    target_post_id: string | null;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=Draft.d.ts.map