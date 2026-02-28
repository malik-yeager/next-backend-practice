"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const tagController = new tag_controller_1.TagController();
router.get("/", auth_middleware_1.requireAuth, tagController.getAllTags);
router.get("/:id", auth_middleware_1.requireAuth, tagController.getTagById);
router.post("/", auth_middleware_1.requireAuth, tagController.createTag);
router.put("/:id", auth_middleware_1.requireAuth, tagController.updateTag);
router.delete("/:id", auth_middleware_1.requireAuth, tagController.deleteTag);
exports.default = router;
//# sourceMappingURL=tag.routes.js.map