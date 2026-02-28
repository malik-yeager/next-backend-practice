import { Request, Response } from "express";
import * as newsletterService from "../services/newsletter.service";

export class NewsletterController {
    async subscribe(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const subscriber = await newsletterService.subscribe(email);
            res.status(201).json({
                status: "success",
                data: subscriber,
            });
        } catch (err: any) {
            const code = err.message === "Email already subscribed" ? 409 : 400;
            res.status(code).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
