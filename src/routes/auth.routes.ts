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

// Get Current User
router.get("/me", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ status: "success", user: req.user });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
});

export default router;
