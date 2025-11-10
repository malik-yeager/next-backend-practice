import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
      const user = await authService.registerUser(email, password, name);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static logout(req: Request, res: Response) {
    // Passport logout
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }

      // Explicitly destroy the session
      req.session?.destroy((sessionErr) => {
        if (sessionErr) {
          console.error("Session destroy error:", sessionErr);
          return res.status(500).json({ message: "Session destroy failed" });
        }

        // Clear the session cookie (important!)
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  }
}
