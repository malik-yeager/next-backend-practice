"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditLog_controller_1 = require("../controllers/auditLog.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const auditController = new auditLog_controller_1.AuditLogController();
// ✅ Routes
router.get("/", auth_middleware_1.requireAuth, auditController.getAll);
router.get("/:id", auth_middleware_1.requireAuth, auditController.getById);
router.delete("/:id", auth_middleware_1.requireAuth, auditController.deleteById);
router.delete("/", auth_middleware_1.requireAuth, auditController.clearAll);
exports.default = router;
//# sourceMappingURL=auditLog.routes.js.map