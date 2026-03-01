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

  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const token = await authService.generatePasswordResetToken(email);

      if (!token) {
        // We shouldn't leak whether a user exists or not, so return success anyway
        return res.status(200).json({ message: "If that email is registered, a reset link will be sent." });
      }

      // IN A REAL APP: Send an email using Nodemailer/SendGrid here.
      // E.g., const resetLink = `http://localhost:3000/reset-password?token=${token}`;
      // sendEmail(email, "Password Reset", `Click here: ${resetLink}`);

      console.log(`\n📧 MOCK EMAIL TO: ${email}`);
      console.log(`Subject: Password Reset Request`);
      console.log(`Body: Click here to reset your password: http://localhost:3000/reset-password?token=${token}\n`);

      res.status(200).json({ message: "If that email is registered, a reset link will be sent." });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while processing your request" });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    try {
      const success = await authService.resetPassword(token, newPassword);

      if (!success) {
        return res.status(400).json({ message: "Token is invalid or has expired" });
      }

      res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while resetting password" });
    }
  }

  static async setPassword(req: Request, res: Response) {
    // If we use this endpoint while logged in, passport injects `req.user`
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in first." });
    }

    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    try {
      // req.user has been injected by passport
      const user = req.user as any;
      const success = await authService.setPassword(user.id, newPassword);

      if (!success) {
        return res.status(400).json({ message: "Failed to set password." });
      }

      res.status(200).json({ message: "Password updated successfully" });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while updating the password" });
    }
  }
}
