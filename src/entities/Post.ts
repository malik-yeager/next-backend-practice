import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  import { User } from "./User";
  import { BaseEntity } from "./BaseEntity";
  
@Entity("posts")
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", unique: true })
    slug!: string;
  
    @Column({ type: "varchar" })
    title!: string;
  
    @Column({ type: "text", nullable: true })
    excerpt!: string | null;
  
    @Column({ type: "text", nullable: true })
    thumbnail!: string | null;
  
    @Column({ type: "jsonb", nullable: true })
    content!: Record<string, any> | null;
  
    // 🧑 Author (User)
    @Column({ type: "uuid", nullable: true })
    author_id!: string | null;
  
    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "author_id" })
    author!: User | null;
  
    // 👤 Created / Updated by users
    @Column({ type: "uuid", nullable: true })
    created_by!: string | null;
  
    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "created_by" })
    createdBy!: User | null;
  
    @Column({ type: "uuid", nullable: true })
    updated_by!: string | null;
  
    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "updated_by" })
    updatedBy!: User | null;
  
    // 📰 Status fields
    @Column({ type: "text", default: "draft" })
    status!: "draft" | "published" | "archived";
  
    @Column({ type: "text", default: "public" })
    visibility!: "public" | "private";
  
    @Column({ type: "timestamp", nullable: true })
    published_at!: Date | null;
  
    @Column({ type: "timestamp", nullable: true })
    scheduled_at!: Date | null;
  
    @Column({ type: "timestamp", nullable: true })
    archived_at!: Date | null;
  
    @Column({ type: "jsonb", nullable: true })
    meta!: Record<string, any> | null;
  
    // 🏷️ Tags and Categories
    @Column({ type: "text", array: true, nullable: true })
    tags!: string[] | null;
  
    @Column({ type: "text", array: true, nullable: true })
    categories!: string[] | null;
  
    // 📊 Metrics
    @Column({ type: "int", default: 0 })
    views_count!: number;
  
    @Column({ type: "int", default: 0 })
    likes_count!: number;
  
    @Column({ type: "int", default: 0 })
    comments_count!: number;
  
    @Column({ type: "int", default: 1 })
    revision!: number;
  
    @Column({ type: "uuid", nullable: true })
    previous_version_id!: string | null;
  
    @ManyToOne(() => Post, (post) => post.id, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "previous_version_id" })
    previousVersion!: Post | null;
  
    // 🕒 Lifecycle timestamps
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at!: Date | null;
  }
  