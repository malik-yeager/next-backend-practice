"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    static async register(req, res) {
        const { email, password, name } = req.body;
        try {
            const user = await authService.registerUser(email, password, name);
            res.json(user);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static logout(req, res) {
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
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map