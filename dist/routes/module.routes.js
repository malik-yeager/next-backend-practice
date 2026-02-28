"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const module_controller_1 = require("../controllers/module.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const moduleController = new module_controller_1.ModuleController();
router.get("/", auth_middleware_1.requireAuth, moduleController.getAllModules);
router.get("/:id", auth_middleware_1.requireAuth, moduleController.getModuleById);
router.post("/", auth_middleware_1.requireAuth, moduleController.createModule);
router.put("/:id", auth_middleware_1.requireAuth, moduleController.updateModule);
router.delete("/:id", auth_middleware_1.requireAuth, moduleController.deleteModule);
exports.default = router;
//# sourceMappingURL=module.routes.js.map