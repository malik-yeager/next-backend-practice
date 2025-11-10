import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Role } from "./Role";
  import { ModulePermission } from "./ModulePermission";
  
  @Entity({ name: "role_permissions" })
  @Unique(["role", "modulePermission"]) // ✅ One entry per module per role
  export class RolePermission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @ManyToOne(() => Role, (role) => role.permissions, { onDelete: "CASCADE" })
    role!: Role;
  
    @ManyToOne(() => ModulePermission, (mp) => mp.rolePermissions, {
      eager: true,
      onDelete: "CASCADE",
    })
    modulePermission!: ModulePermission;
  
    // Denormalized module name for simpler filtering in queries
    @Index()
    @Column({ type: "text", nullable: false })
    module_name!: string;
  
    @Column({ type: "boolean", default: false })
    create!: boolean;
  
    @Column({ type: "boolean", default: false })
    read!: boolean;
  
    @Column({ type: "boolean", default: false })
    update!: boolean;
  
    @Column({ type: "boolean", default: false })
    delete!: boolean;
  
    @Column({ type: "boolean", default: false })
    fullAccess!: boolean;
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
  }
  