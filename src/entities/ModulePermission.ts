import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Unique,
  } from "typeorm";
  import { RolePermission } from "./RolePermission";
  
  @Entity({ name: "module_permissions" })
  @Unique(["module_name"])
  export class ModulePermission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "text", nullable: false })
    module_name!: string; // e.g., "Users", "Invoices", "Projects"
  
    @Column({ type: "text", nullable: true })
    description!: string | null;
  
    // These flags define which permission types exist for this module
    @Column({ type: "boolean", default: true })
    create!: boolean;
  
    @Column({ type: "boolean", default: true })
    read!: boolean;
  
    @Column({ type: "boolean", default: true })
    update!: boolean;
  
    @Column({ type: "boolean", default: true })
    delete!: boolean;
  
    @Column({ type: "boolean", default: true })
    fullAccess!: boolean;
  
    @OneToMany(() => RolePermission, (rp) => rp.modulePermission, {
      cascade: false,
    })
    rolePermissions!: RolePermission[];
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
  }
  