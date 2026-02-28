import { User } from "./User";
import { BaseEntity } from "./BaseEntity";
export declare class Post extends BaseEntity {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    thumbnail: string | null;
    content: Record<string, any> | null;
    author_id: string | null;
    author: User | null;
    created_by: string | null;
    createdBy: User | null;
    updated_by: string | null;
    updatedBy: User | null;
    status: "draft" | "published" | "archived";
    visibility: "public" | "private";
    published_at: Date | null;
    scheduled_at: Date | null;
    archived_at: Date | null;
    meta: Record<string, any> | null;
    affiliate: boolean;
    sponsored: boolean;
    canonical_url: string | null;
    featured_image: string | null;
    tags: string[] | null;
    categories: string[] | null;
    views_count: number;
    likes_count: number;
    comments_count: number;
    revision: number;
    previous_version_id: string | null;
    previousVersion: Post | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
//# sourceMappingURL=Post.d.ts.map