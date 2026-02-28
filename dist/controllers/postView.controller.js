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
exports.deleteExistingPostView = exports.updateExistingPostView = exports.createNewPostView = exports.fetchPostView = exports.fetchPostViews = void 0;
const postViewService = __importStar(require("../services/postView.services"));
const fetchPostViews = async (req, res) => {
    try {
        const views = await postViewService.getAllPostViews();
        res.json(views);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.fetchPostViews = fetchPostViews;
const fetchPostView = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        const view = await postViewService.getPostViewById(id);
        if (!view) {
            return res.status(404).json({ message: "PostView not found" });
        }
        res.json(view);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.fetchPostView = fetchPostView;
const createNewPostView = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const newView = await postViewService.createPostView(postId, userId);
        res.status(201).json(newView);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createNewPostView = createNewPostView;
const updateExistingPostView = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        const { postId, userId } = req.body;
        const updatedView = await postViewService.updatePostView(id, postId, userId);
        res.json(updatedView);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateExistingPostView = updateExistingPostView;
const deleteExistingPostView = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        await postViewService.deletePostView(id);
        res.json({ message: "PostView deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteExistingPostView = deleteExistingPostView;
//# sourceMappingURL=postView.controller.js.map