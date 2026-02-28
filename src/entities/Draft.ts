import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity("drafts")
export class Draft extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", nullable: true })
    title!: string | null;

    @Column({ type: "varchar", nullable: true })
    slug!: string | null;

    @Column({ type: "text", nullable: true })
    excerpt!: string | null;

    @Column({ type: "jsonb", nullable: true })
    content!: Record<string, any> | null;

    // 🧑 Author (User)
    @Column({ type: "uuid", nullable: true })
    author_id!: string | null;

    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "author_id" })
    author!: User | null;

    // 🔗 Meta & Settings (Flexible JSON for all properties)
    @Column({ type: "jsonb", nullable: true })
    meta!: Record<string, any> | null;

    // 🎯 Target Post (If editing an existing post)
    @Column({ type: "uuid", nullable: true })
    target_post_id!: string | null;

    // 🕒 Lifecycle timestamps
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}
