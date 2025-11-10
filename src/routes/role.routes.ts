import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const roleController = new RoleController();

router.get("/", requireAuth, (req, res) => roleController.getAllRoles(req, res));
router.get("/:id", requireAuth,roleController.getRoleById);
router.post("/", requireAuth, (req, res) => roleController.createRole(req, res));
router.put("/:id", requireAuth,roleController.updateRole);
router.delete("/:id", requireAuth, roleController.deleteRole);

export default router;
