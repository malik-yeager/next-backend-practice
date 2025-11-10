import { Router } from "express";
import { AuditLogController } from "../controllers/auditLog.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
const auditController = new AuditLogController();

// ✅ Routes
router.get("/", requireAuth, auditController.getAll);
router.get("/:id", requireAuth, auditController.getById);
router.delete("/:id", requireAuth, auditController.deleteById);
router.delete("/", requireAuth, auditController.clearAll);

export default router;
