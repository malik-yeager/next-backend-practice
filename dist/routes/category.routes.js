"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController();
router.get("/", auth_middleware_1.requireAuth, categoryController.getAllCategories);
router.get("/:id", auth_middleware_1.requireAuth, categoryController.getCategoryById);
router.post("/", auth_middleware_1.requireAuth, categoryController.createCategory);
router.put("/:id", auth_middleware_1.requireAuth, categoryController.updateCategory);
router.delete("/:id", auth_middleware_1.requireAuth, categoryController.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map