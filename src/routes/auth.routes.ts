import { Router } from "express";
import passport from "../lib/passport";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Local login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

// Register
router.post("/register", AuthController.register);

// Logout
router.post("/logout", AuthController.logout);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({ message: "Logged in with Google", user: req.user });
  }
);

export default router;
