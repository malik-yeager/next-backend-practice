"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postTag_controller_1 = require("../controllers/postTag.controller");
const router = (0, express_1.Router)();
router.get("/", postTag_controller_1.fetchPostTags);
router.get("/:postId/:tagId", postTag_controller_1.fetchPostTag);
router.post("/", postTag_controller_1.createNewPostTag);
router.delete("/:postId/:tagId", postTag_controller_1.deleteExistingPostTag);
exports.default = router;
//# sourceMappingURL=postTag.routes.js.map