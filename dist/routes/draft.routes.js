"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const draft_controller_1 = require("../controllers/draft.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const draftController = new draft_controller_1.DraftController();
router.post("/", auth_middleware_1.requireAuth, draftController.createDraft);
router.get("/", auth_middleware_1.requireAuth, draftController.getAllDrafts);
router.get("/:id", auth_middleware_1.requireAuth, draftController.getDraftById);
router.put("/:id", auth_middleware_1.requireAuth, draftController.updateDraft);
router.post("/:id/publish", auth_middleware_1.requireAuth, draftController.publishDraft);
exports.default = router;
//# sourceMappingURL=draft.routes.js.map