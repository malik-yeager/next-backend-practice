import { Request, Response } from "express";
import * as draftService from "../services/draft.service";

export class DraftController {
    // ✅ Create Draft
    async createDraft(req: Request, res: Response) {
        try {
            const user = req.user as any;
            const isAdmin = user?.role?.role_name === 'admin';

            // If not admin, force author to be current user
            if (!isAdmin) {
                req.body.author_id = user.id;
            }

            const draft = await draftService.createDraft(req.body);
            res.status(201).json({
                status: "success",
                data: draft,
            });
        } catch (err: any) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }

    // ✅ Get All Drafts
    async getAllDrafts(req: Request, res: Response) {
        try {
            const drafts = await draftService.getAllDrafts();
            res.json({
                status: "success",
                data: drafts,
            });
        } catch (err: any) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }

    // ✅ Get Draft
    async getDraftById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ status: "error", message: "Draft ID is required" });
        try {
            const draft = await draftService.getDraftById(id);
            if (!draft) {
                return res.status(404).json({ status: "error", message: "Draft not found" });
            }
            res.json({
                status: "success",
                data: draft,
            });
        } catch (err: any) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }

    // ✅ Update Draft
    async updateDraft(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ status: "error", message: "Draft ID is required" });
        try {
            const draft = await draftService.updateDraft(id, req.body);
            res.json({
                status: "success",
                data: draft,
            });
        } catch (err: any) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }

    // ✅ Publish Draft
    async publishDraft(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ status: "error", message: "Draft ID is required" });
        try {
            const post = await draftService.publishDraft(id);
            res.json({
                status: "success",
                message: "Draft published successfully",
                data: post,
            });
        } catch (err: any) {
            res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
