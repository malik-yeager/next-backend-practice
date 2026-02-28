"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const roleController = new role_controller_1.RoleController();
router.get("/", auth_middleware_1.requireAuth, (req, res) => roleController.getAllRoles(req, res));
router.get("/:id", auth_middleware_1.requireAuth, roleController.getRoleById);
router.post("/", auth_middleware_1.requireAuth, (req, res) => roleController.createRole(req, res));
router.put("/:id", auth_middleware_1.requireAuth, roleController.updateRole);
router.delete("/:id", auth_middleware_1.requireAuth, roleController.deleteRole);
exports.default = router;
//# sourceMappingURL=role.routes.js.map