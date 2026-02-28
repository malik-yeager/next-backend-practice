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
exports.CategoryController = void 0;
const categoryService = __importStar(require("../services/category.service"));
class CategoryController {
    // ✅ Get all
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json({
                status: "success",
                total: categories.length,
                data: categories,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get by ID
    async getCategoryById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing category ID",
            });
        try {
            const category = await categoryService.getCategoryById(id);
            if (!category)
                return res.status(404).json({
                    status: "error",
                    message: "Category not found",
                });
            res.json({
                status: "success",
                data: category,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Create
    async createCategory(req, res) {
        const { name, slug, description } = req.body;
        if (!name || !slug)
            return res.status(400).json({
                status: "error",
                message: "Missing required fields",
            });
        try {
            const category = await categoryService.createCategory(name, slug, description);
            res.status(201).json({
                status: "success",
                data: category,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Update
    async updateCategory(req, res) {
        const { id } = req.params;
        const { name, slug, description } = req.body;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing category ID",
            });
        try {
            const category = await categoryService.updateCategory(id, name, slug, description);
            res.json({
                status: "success",
                data: category,
            });
        }
        catch (err) {
            if (err.message === "Category not found") {
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
    // ✅ Delete
    async deleteCategory(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing category ID",
            });
        try {
            const result = await categoryService.deleteCategory(id);
            res.json({
                status: "success",
                message: result.message,
            });
        }
        catch (err) {
            if (err.message === "Category not found") {
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
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map