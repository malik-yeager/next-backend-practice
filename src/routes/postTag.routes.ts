import { Router } from "express";
import { fetchPostTags, fetchPostTag, createNewPostTag, deleteExistingPostTag } from "../controllers/postTag.controller";

const router = Router();

router.get("/", fetchPostTags);
router.get("/:postId/:tagId", fetchPostTag);
router.post("/", createNewPostTag);
router.delete("/:postId/:tagId", deleteExistingPostTag);

export default router;