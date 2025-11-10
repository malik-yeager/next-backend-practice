import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User; // 👈 Now req.user is strongly typed as your User entity
    }
  }
}
