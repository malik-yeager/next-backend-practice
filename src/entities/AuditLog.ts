// src/entities/AuditLog.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", nullable: true })
  user_id!: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "user_id" })
  user!: User | null;

  @Column({ type: "text" })
  action!: string;

  @Column({ type: "text", nullable: true })
  entity_name!: string | null;

  @Column({ type: "uuid", nullable: true })
  entity_id!: string | null;

  @Column({ type: "jsonb", nullable: true })
  details!: Record<string, any> | null;

  @Column({ type: "text", nullable: true })
  endpoint!: string | null;

  @Column({ type: "text", nullable: true })
  ip_address!: string | null;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
