// lib/auth.ts
import { AuthConfig } from "@auth/core";
import CredentialsProvider from "@auth/core/providers/credentials";
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import { AppDataSource } from "../config/data-source";
import { Account } from "../entities/Account";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { Session } from "../entities/Session";
import { Role } from "../entities/Role";

export const authOptions: AuthConfig = {
  adapter: TypeORMAdapter({
    type: "postgres",
    url: process.env.DATABASE_URL!,
    synchronize: true,
    logging: true,
    entities: [User, Account, Session, Role],
  }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || typeof credentials.email !== "string") {
          throw new Error("Invalid email");
        }
        if (!credentials?.password || typeof credentials.password !== "string") {
          throw new Error("Invalid password");
        }

        const accountRepo = AppDataSource.getRepository(Account);
        const account = await accountRepo.findOne({
          where: { provider: "credentials", providerAccountId: credentials.email },
          relations: ["user"],
        });

        if (!account || !account.password) throw new Error("No account found");
        const valid = await bcrypt.compare(credentials.password, account.password);
        if (!valid) throw new Error("Invalid password");

        return account.user;
      },
    }),
  ],
  session: {
    strategy: "database",  // Store sessions in DB
    maxAge: 30 * 24 * 60 * 60,  // 30 days
    updateAge: 24 * 60 * 60,  // Refresh every 24 hours
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET!,
};