import { Router } from "express";
import { DraftController } from "../controllers/draft.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const draftController = new DraftController();

router.post("/", requireAuth, draftController.createDraft);
router.get("/", requireAuth, draftController.getAllDrafts);
router.get("/:id", requireAuth, draftController.getDraftById);
router.put("/:id", requireAuth, draftController.updateDraft);
router.post("/:id/publish", requireAuth, draftController.publishDraft);

export default router;
