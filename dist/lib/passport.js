"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const Account_1 = require("../entities/Account");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Local Strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const accountRepo = data_source_1.AppDataSource.getRepository(Account_1.Account);
        const account = await accountRepo.findOne({
            where: { provider: "credentials", providerAccountId: email },
            relations: ["user"]
        });
        if (!account || !account.password)
            return done(null, false, { message: "Invalid credentials" });
        const valid = await bcrypt_1.default.compare(password, account.password);
        if (!valid)
            return done(null, false, { message: "Invalid credentials" });
        return done(null, account.user);
    }
    catch (err) {
        done(err);
    }
}));
// Google OAuth Strategy (safe)
if (process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET) {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
            const accountRepo = data_source_1.AppDataSource.getRepository(Account_1.Account);
            let account = await accountRepo.findOne({
                where: { provider: "google", providerAccountId: profile.id },
                relations: ["user"],
            });
            if (!account) {
                const user = userRepo.create({
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value || null,
                });
                await userRepo.save(user);
                account = accountRepo.create({
                    provider: "google",
                    providerAccountId: profile.id,
                    type: "oauth",
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    user,
                });
                await accountRepo.save(account);
            }
            done(null, account.user);
        }
        catch (err) {
            done(err);
        }
    }));
}
else {
    console.warn("⚠️ Google OAuth disabled: missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET");
}
// Serialize / Deserialize
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await data_source_1.AppDataSource.getRepository(User_1.User).findOne({
            where: { id },
            relations: ["role"]
        });
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map