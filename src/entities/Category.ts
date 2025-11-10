import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { BaseEntity } from "./BaseEntity";

@Entity("categories")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "text", nullable: false })
    name!: string;
  
    @Column({ type: "text", unique: true, nullable: false })
    slug!: string;
  
    @Column({ type: "text", nullable: true })
    description!: string | null;
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
  }
  