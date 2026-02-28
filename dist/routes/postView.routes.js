"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postView_controller_1 = require("../controllers/postView.controller");
const router = (0, express_1.Router)();
router.get("/", postView_controller_1.fetchPostViews);
router.get("/:id", postView_controller_1.fetchPostView);
router.post("/", postView_controller_1.createNewPostView);
router.put("/:id", postView_controller_1.updateExistingPostView);
router.delete("/:id", postView_controller_1.deleteExistingPostView);
exports.default = router;
//# sourceMappingURL=postView.routes.js.map