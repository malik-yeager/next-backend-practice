"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService = __importStar(require("../services/user.service"));
class UserController {
    // ✅ Get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json({
                status: "success",
                total: users.length,
                data: users,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get user by ID
    async getUserById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing user ID",
            });
        try {
            const user = await userService.getUserById(id);
            if (!user)
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            res.json({
                status: "success",
                data: user,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Create new user
    async createUser(req, res) {
        const { name, email, roleId, bio, social_links } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields",
            });
        }
        try {
            const user = await userService.createUser(name, email, roleId, bio, social_links);
            res.status(201).json({
                status: "success",
                data: user,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Update user by ID
    async updateUser(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing user ID",
            });
        const { name, email, roleId, bio, social_links } = req.body;
        try {
            const user = await userService.updateUser(id, name, email, roleId, bio, social_links);
            res.json({
                status: "success",
                data: user,
            });
        }
        catch (err) {
            if (err.message === "User not found") {
                return res.status(404).json({
                    status: "error",
                    message: err.message,
                });
            }
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Delete user by ID
    async deleteUser(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing user ID",
            });
        try {
            const result = await userService.deleteUser(id);
            res.json({
                status: "success",
                message: result.message,
            });
        }
        catch (err) {
            if (err.message === "User not found") {
                return res.status(404).json({
                    status: "error",
                    message: err.message,
                });
            }
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map