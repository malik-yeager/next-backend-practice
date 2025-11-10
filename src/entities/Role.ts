// ✅ src/entities/Role.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { RolePermission } from "./RolePermission";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  role_name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(() => RolePermission, (perm) => perm.role, { cascade: true })
  permissions!: RolePermission[];
}
