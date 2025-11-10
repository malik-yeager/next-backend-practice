// src/entities/BaseEntity.ts
import { 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  ManyToOne, 
  JoinColumn, 
  Column 
} from "typeorm";
import { User } from "./User";

export abstract class BaseEntity {
  @Column({ type: "uuid", nullable: true })
  created_by!: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy!: User | null;

  @Column({ type: "uuid", nullable: true })
  updated_by!: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "updated_by" })
  updatedBy!: User | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
