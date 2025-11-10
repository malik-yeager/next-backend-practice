import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from "typeorm"
  import { User } from "./User"
  
  @Entity({ name: "accounts" })
  export class Account {
    @PrimaryGeneratedColumn("uuid")
    id!: string
  
    @Column()
    type!: string
  
    @Column()
    provider!: string 
  
    @Column()
    providerAccountId!: string 

    @Column({ type: "text", nullable: true })
password!: string | null

    @Column({ type: "text", nullable: true })
    refresh_token!: string | null
  
    @Column({ type: "text", nullable: true })
    access_token!: string | null
  
    @Column({ type: "bigint", nullable: true })
    expires_at!: number | null
  
    @Column({ type: "text", nullable: true })
token_type!: string | null

  
@Column({ type: "text", nullable: true })
    scope!: string | null
  
    @Column({ type: "text", nullable: true })
    id_token!: string | null
  
    @Column({ type: "text", nullable: true })
    session_state!: string | null
  
    @ManyToOne(() => User, (user) => user.accounts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User
  }
  