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
exports.RoleController = void 0;
const roleService = __importStar(require("../services/role.service"));
class RoleController {
    // ✅ Get all roles
    async getAllRoles(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.json({
                status: "success",
                total: roles.length,
                data: roles,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get role by ID
    async getRoleById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing role ID",
            });
        try {
            const role = await roleService.getRoleById(id);
            if (!role)
                return res.status(404).json({
                    status: "error",
                    message: "Role not found",
                });
            res.json({
                status: "success",
                data: role,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    async createRole(req, res) {
        const { role_name, description, permissions } = req.body;
        if (!role_name)
            return res.status(400).json({
                status: "error",
                message: "Missing required field: role_name",
            });
        try {
            const role = await roleService.createRole(role_name, permissions, description);
            res.status(201).json({
                status: "success",
                data: role,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Update role by ID
    async updateRole(req, res) {
        const { id } = req.params;
        const { role_name, description, permissions } = req.body;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing role ID",
            });
        try {
            const role = await roleService.updateRole(id, role_name, description, permissions);
            res.json({
                status: "success",
                data: role,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Delete role by ID
    async deleteRole(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing role ID",
            });
        try {
            const result = await roleService.deleteRole(id);
            res.json({
                status: "success",
                message: result.message,
            });
        }
        catch (err) {
            if (err.message === "Role not found") {
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
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map