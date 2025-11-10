import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const categoryController = new CategoryController();

router.get("/", requireAuth, categoryController.getAllCategories);
router.get("/:id", requireAuth, categoryController.getCategoryById);
router.post("/", requireAuth, categoryController.createCategory);
router.put("/:id", requireAuth, categoryController.updateCategory);
router.delete("/:id", requireAuth, categoryController.deleteCategory);

export default router;
