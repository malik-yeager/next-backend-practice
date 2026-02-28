import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const postController = new PostController();

router.get("/", requireAuth, postController.getAllPosts);
router.get("/:id", requireAuth, postController.getPostById);
router.get("/:id/related", requireAuth, postController.getRelatedPosts);
router.post("/", requireAuth, postController.createPost);
router.put("/:id", requireAuth, postController.updatePost);
router.delete("/:id", requireAuth, postController.deletePost);

export default router;
