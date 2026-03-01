import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Account } from "../entities/Account";
import crypto from "crypto";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private accountRepo = AppDataSource.getRepository(Account);

  async registerUser(email: string, password: string, name?: string) {
    const userRepo = AppDataSource.getRepository(User);
    const accountRepo = AppDataSource.getRepository(Account);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

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

  async generatePasswordResetToken(email: string): Promise<string | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null; // Or throw error, depending on if you want to leak user existence

    // Generate a secure, random token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash it before storing in DB
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    // Token expires in 1 hour
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);

    await this.userRepo.save(user);

    return rawToken; // Return the plain token to send via email
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    // Hash the token from the user to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await this.userRepo.findOne({
      where: { resetPasswordToken: hashedToken },
    });

    // Check if token is invalid or expired
    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return false;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password on Account (if it exists, if oauth only, we should create or warn)
    let account = await this.accountRepo.findOne({
      where: { user: { id: user.id }, provider: "credentials" }
    });

    if (account) {
      account.password = hashedPassword;
      await this.accountRepo.save(account);
    } else {
      // User might have signed up with Google, now they are setting a password.
      // Create a credentials account for them.
      account = this.accountRepo.create({
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.email!, // Use email as account id for credentials
        password: hashedPassword,
        user,
      });
      await this.accountRepo.save(account);
    }

    // Clear reset token and expiration
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userRepo.save(user);

    return true;
  }

  async setPassword(userId: string, newPassword: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let account = await this.accountRepo.findOne({
      where: { user: { id: userId }, provider: "credentials" }
    });

    if (account) {
      account.password = hashedPassword;
      await this.accountRepo.save(account);
    } else {
      // User might have signed up with Google, now they are setting a password.
      account = this.accountRepo.create({
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.email!, // Use email as account id for credentials
        password: hashedPassword,
        user,
      });
      await this.accountRepo.save(account);
    }

    return true;
  }
}
