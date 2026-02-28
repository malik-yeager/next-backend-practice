"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const credentials_1 = __importDefault(require("@auth/core/providers/credentials"));
const typeorm_adapter_1 = require("@auth/typeorm-adapter");
const data_source_1 = require("../config/data-source");
const Account_1 = require("../entities/Account");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../entities/User");
const Session_1 = require("../entities/Session");
const Role_1 = require("../entities/Role");
exports.authOptions = {
    adapter: (0, typeorm_adapter_1.TypeORMAdapter)({
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true,
        entities: [User_1.User, Account_1.Account, Session_1.Session, Role_1.Role],
    }),
    providers: [
        (0, credentials_1.default)({
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
                const accountRepo = data_source_1.AppDataSource.getRepository(Account_1.Account);
                const account = await accountRepo.findOne({
                    where: { provider: "credentials", providerAccountId: credentials.email },
                    relations: ["user"],
                });
                if (!account || !account.password)
                    throw new Error("No account found");
                const valid = await bcrypt_1.default.compare(credentials.password, account.password);
                if (!valid)
                    throw new Error("Invalid password");
                return account.user;
            },
        }),
    ],
    session: {
        strategy: "database", // Store sessions in DB
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // Refresh every 24 hours
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
    secret: process.env.AUTH_SECRET,
};
//# sourceMappingURL=auth.js.map