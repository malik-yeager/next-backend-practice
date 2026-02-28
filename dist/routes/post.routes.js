"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const postController = new post_controller_1.PostController();
router.get("/", auth_middleware_1.requireAuth, postController.getAllPosts);
router.get("/:id", auth_middleware_1.requireAuth, postController.getPostById);
router.get("/:id/related", auth_middleware_1.requireAuth, postController.getRelatedPosts);
router.post("/", auth_middleware_1.requireAuth, postController.createPost);
router.put("/:id", auth_middleware_1.requireAuth, postController.updatePost);
router.delete("/:id", auth_middleware_1.requireAuth, postController.deletePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map