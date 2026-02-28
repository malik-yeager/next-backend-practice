"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const Account_1 = require("../entities/Account");
class AuthService {
    constructor() {
        this.userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        this.accountRepo = data_source_1.AppDataSource.getRepository(Account_1.Account);
    }
    async registerUser(email, password, name) {
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const accountRepo = data_source_1.AppDataSource.getRepository(Account_1.Account);
        // hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // create user
        const user = userRepo.create({
            email: email ?? null,
            name: name ?? null,
            emailVerified: null,
            image: null,
        });
        await userRepo.save(user);
        // create credentials account
        const account = accountRepo.create({
            type: "credentials",
            provider: "credentials",
            providerAccountId: email,
            password: hashedPassword,
            user, // link relation
        });
        await accountRepo.save(account);
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map