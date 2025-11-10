import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Account } from "../entities/Account";

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
  
}
