import { Router } from "express";
import { fetchPostViews, fetchPostView, createNewPostView, updateExistingPostView, deleteExistingPostView } from "../controllers/postView.controller";

const router = Router();

router.get("/", fetchPostViews);
router.get("/:id", fetchPostView);
router.post("/", createNewPostView);
router.put("/:id", updateExistingPostView);
router.delete("/:id", deleteExistingPostView);

export default router;