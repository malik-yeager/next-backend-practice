import { Router } from "express";
import { NewsletterController } from "../controllers/newsletter.controller";

const router = Router();
const newsletterController = new NewsletterController();

router.post("/subscribe", newsletterController.subscribe);

export default router;
