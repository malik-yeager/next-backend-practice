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
exports.ModuleController = void 0;
const moduleService = __importStar(require("../services/module.service"));
class ModuleController {
    // ✅ Get all modules
    async getAllModules(req, res) {
        try {
            const modules = await moduleService.getAllModules();
            res.json({
                status: "success",
                total: modules.length,
                data: modules,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get module by ID
    async getModuleById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing module ID",
            });
        try {
            const module = await moduleService.getModuleById(id);
            if (!module)
                return res.status(404).json({
                    status: "error",
                    message: "Module not found",
                });
            res.json({
                status: "success",
                data: module,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Create new module
    async createModule(req, res) {
        const { module_name, description, available_actions } = req.body;
        if (!module_name)
            return res.status(400).json({
                status: "error",
                message: "Missing required field: module_name",
            });
        try {
            const module = await moduleService.createModule(module_name, description, available_actions);
            res.status(201).json({
                status: "success",
                data: module,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Update module by ID
    async updateModule(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing module ID",
            });
        const { module_name, description, available_actions } = req.body;
        try {
            const module = await moduleService.updateModule(id, {
                module_name,
                description,
                available_actions,
            });
            res.json({
                status: "success",
                data: module,
            });
        }
        catch (err) {
            if (err.message === "Module not found") {
                return res.status(404).json({
                    status: "error",
                    message: err.message,
                });
            }
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Delete module by ID
    async deleteModule(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing module ID",
            });
        try {
            const result = await moduleService.deleteModule(id);
            res.json({
                status: "success",
            });
        }
        catch (err) {
            if (err.message === "Module not found") {
                return res.status(404).json({
                    status: "error",
                    message: err.message,
                });
            }
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
exports.ModuleController = ModuleController;
//# sourceMappingURL=module.controller.js.map