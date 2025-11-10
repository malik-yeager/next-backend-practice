import { Router } from "express";
import { ModuleController } from "../controllers/module.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const moduleController = new ModuleController();

router.get("/", requireAuth, moduleController.getAllModules);
router.get("/:id", requireAuth, moduleController.getModuleById);
router.post("/", requireAuth, moduleController.createModule);
router.put("/:id", requireAuth, moduleController.updateModule);
router.delete("/:id", requireAuth, moduleController.deleteModule);

export default router;
