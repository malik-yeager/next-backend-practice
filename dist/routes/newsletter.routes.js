"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletter_controller_1 = require("../controllers/newsletter.controller");
const router = (0, express_1.Router)();
const newsletterController = new newsletter_controller_1.NewsletterController();
router.post("/subscribe", newsletterController.subscribe);
exports.default = router;
//# sourceMappingURL=newsletter.routes.js.map