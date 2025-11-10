import { Router } from "express";
import { TagController } from "../controllers/tag.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const tagController = new TagController();

router.get("/", requireAuth, tagController.getAllTags);
router.get("/:id", requireAuth, tagController.getTagById);
router.post("/", requireAuth, tagController.createTag);
router.put("/:id", requireAuth, tagController.updateTag);
router.delete("/:id", requireAuth, tagController.deleteTag);

export default router;
