"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../lib/passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Local login
router.post("/login", passport_1.default.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in", user: req.user });
});
// Register
router.post("/register", auth_controller_1.AuthController.register);
// Logout
router.post("/logout", auth_controller_1.AuthController.logout);
// Google OAuth
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.json({ message: "Logged in with Google", user: req.user });
});
// Get Current User
router.get("/me", (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.json({ status: "success", user: req.user });
    }
    else {
        res.status(401).json({ status: "error", message: "Unauthorized" });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map