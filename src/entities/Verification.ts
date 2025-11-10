import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "verification_tokens" })
export class VerificationToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  identifier!: string // e.g. email or phone

  @Column()
  token!: string // random code or magic link token

  @Column({ type: "timestamp" })
  expires!: Date
}
