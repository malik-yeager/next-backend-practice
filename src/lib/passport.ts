import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Account } from "../entities/Account";
import bcrypt from "bcrypt";

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const accountRepo = AppDataSource.getRepository(Account);
      const account = await accountRepo.findOne({
        where: { provider: "credentials", providerAccountId: email },
        relations: ["user"]
      });
      if (!account || !account.password) return done(null, false, { message: "Invalid credentials" });

      const valid = await bcrypt.compare(password, account.password);
      if (!valid) return done(null, false, { message: "Invalid credentials" });

      return done(null, account.user);
    } catch (err) {
      done(err);
    }
  })
);
// Google OAuth Strategy (safe)
if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userRepo = AppDataSource.getRepository(User);
          const accountRepo = AppDataSource.getRepository(Account);

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
        } catch (err) {
          done(err);
        }
      }
    )
  );
} else {
  console.warn("⚠️ Google OAuth disabled: missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET");
}


// Serialize / Deserialize
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id },
      relations: ["role"]
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
