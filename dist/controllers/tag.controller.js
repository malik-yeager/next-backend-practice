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
exports.TagController = void 0;
const tagService = __importStar(require("../services/tag.service"));
class TagController {
    // ✅ Get all tags
    async getAllTags(req, res) {
        try {
            const tags = await tagService.getAllTags();
            res.json({
                status: "success",
                total: tags.length,
                data: tags,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get tag by ID
    async getTagById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing tag ID",
            });
        try {
            const tag = await tagService.getTagById(id);
            if (!tag)
                return res.status(404).json({
                    status: "error",
                    message: "Tag not found",
                });
            res.json({
                status: "success",
                data: tag,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Create tag
    async createTag(req, res) {
        const { name, slug, description } = req.body;
        if (!name || !slug)
            return res.status(400).json({
                status: "error",
                message: "Missing required fields",
            });
        try {
            const tag = await tagService.createTag(name, slug, description);
            res.status(201).json({
                status: "success",
                data: tag,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Update tag
    async updateTag(req, res) {
        const { id } = req.params;
        const { name, slug, description } = req.body;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing tag ID",
            });
        try {
            const tag = await tagService.updateTag(id, name, slug, description);
            res.json({
                status: "success",
                data: tag,
            });
        }
        catch (err) {
            if (err.message === "Tag not found") {
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
    // ✅ Delete tag
    async deleteTag(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                status: "error",
                message: "Missing tag ID",
            });
        try {
            const result = await tagService.deleteTag(id);
            res.json({
                status: "success",
                message: result.message,
            });
        }
        catch (err) {
            if (err.message === "Tag not found") {
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
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map