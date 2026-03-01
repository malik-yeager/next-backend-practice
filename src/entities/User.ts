import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Account } from "./Account";
import { Session } from "./Session";
import { Role } from "./Role";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: true })
  name!: string | null;

  @Column({ type: "text", nullable: true, unique: true })
  email!: string | null

  @Column({ type: "timestamp", nullable: true })
  emailVerified!: Date | null;

  @Column({ type: "text", nullable: true })
  image!: string | null;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column({ type: "jsonb", nullable: true })
  social_links!: Record<string, string> | null;

  // Foreign Key reference to Role
  @Column({ type: "uuid", nullable: true })
  roleId!: string | null;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "roleId" })
  role!: Role | null;

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "timestamp" })
  updatedAt!: Date;

  // 🔑 Password Reset Fields
  @Column({ type: "varchar", nullable: true })
  resetPasswordToken!: string | null;

  @Column({ type: "timestamp", nullable: true })
  resetPasswordExpires!: Date | null;
}
