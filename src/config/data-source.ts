import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import { User } from "../entities/User"
import { Account } from "../entities/Account"
import { Session } from "../entities/Session"
import { VerificationToken } from "../entities/Verification"
import { Role } from "../entities/Role"
import { RolePermission } from "../entities/RolePermission"
import { ModulePermission } from "../entities/ModulePermission"
import { AuditSubscriber } from "../subscribers/AuditSubscriber";
import { AuditLog } from "../entities/AuditLog"
import { Category } from "../entities/Category"
import { Tag } from "../entities/Tag"
import { Post } from "../entities/Post"



dotenv.config()

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in .env file")
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User, Account, Session, VerificationToken, Role, RolePermission, ModulePermission, Category, Tag, Post, AuditLog],
  subscribers: [AuditSubscriber],
})
