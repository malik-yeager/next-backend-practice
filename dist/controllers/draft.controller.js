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
exports.DraftController = void 0;
const draftService = __importStar(require("../services/draft.service"));
class DraftController {
    // ✅ Create Draft
    async createDraft(req, res) {
        try {
            const user = req.user;
            const isAdmin = user?.role?.role_name === 'admin';
            // If not admin, force author to be current user
            if (!isAdmin) {
                req.body.author_id = user.id;
            }
            const draft = await draftService.createDraft(req.body);
            res.status(201).json({
                status: "success",
                data: draft,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get All Drafts
    async getAllDrafts(req, res) {
        try {
            const drafts = await draftService.getAllDrafts();
            res.json({
                status: "success",
                data: drafts,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get Draft
    async getDraftById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Draft ID is required" });
        try {
            const draft = await draftService.getDraftById(id);
            if (!draft) {
                return res.status(404).json({ status: "error", message: "Draft not found" });
            }
            res.json({
                status: "success",
                data: draft,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Update Draft
    async updateDraft(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Draft ID is required" });
        try {
            const draft = await draftService.updateDraft(id, req.body);
            res.json({
                status: "success",
                data: draft,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Publish Draft
    async publishDraft(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Draft ID is required" });
        try {
            const post = await draftService.publishDraft(id);
            res.json({
                status: "success",
                message: "Draft published successfully",
                data: post,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
exports.DraftController = DraftController;
//# sourceMappingURL=draft.controller.js.map