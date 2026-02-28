"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_controller_1 = require("../controllers/author.controller");
const router = (0, express_1.Router)();
router.get("/", author_controller_1.fetchAuthors);
router.get("/:id", author_controller_1.fetchAuthor);
router.get("/:id/posts", author_controller_1.fetchAuthorWithPosts);
router.post("/", author_controller_1.createNewAuthor);
router.put("/:id", author_controller_1.updateExistingAuthor);
router.delete("/:id", author_controller_1.deleteExistingAuthor);
exports.default = router;
//# sourceMappingURL=author.routes.js.map