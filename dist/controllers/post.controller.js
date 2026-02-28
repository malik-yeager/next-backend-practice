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
exports.PostController = void 0;
const postService = __importStar(require("../services/post.service"));
class PostController {
    // ✅ Get all posts
    async getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.json({
                status: "success",
                total: posts.length,
                data: posts,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get post by ID
    async getPostById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Missing post ID" });
        try {
            const post = await postService.getPostById(id);
            if (!post)
                return res.status(404).json({ status: "error", message: "Post not found" });
            res.json({
                status: "success",
                data: post,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get related posts
    async getRelatedPosts(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Missing post ID" });
        try {
            const posts = await postService.getRelatedPosts(id);
            res.json({
                status: "success",
                data: posts,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Create new post
    async createPost(req, res) {
        try {
            const user = req.user;
            const isAdmin = user?.role?.role_name === 'admin';
            // If not admin, force author to be current user
            if (!isAdmin) {
                req.body.author_id = user.id;
            }
            const post = await postService.createPost(req.body);
            res.status(201).json({
                status: "success",
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
    // ✅ Update post
    async updatePost(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Missing post ID" });
        try {
            const post = await postService.updatePost(id, req.body);
            res.json({
                status: "success",
                data: post,
            });
        }
        catch (err) {
            const code = err.message === "Post not found" ? 404 : 400;
            res.status(code).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Delete post
    async deletePost(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ status: "error", message: "Missing post ID" });
        try {
            const result = await postService.deletePost(id);
            res.json({
                status: "success",
                message: result.message,
            });
        }
        catch (err) {
            const code = err.message === "Post not found" ? 404 : 400;
            res.status(code).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map