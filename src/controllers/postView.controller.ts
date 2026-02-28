import { Request, Response } from "express";
import * as postViewService from "../services/postView.services";

export const fetchPostViews = async (req: Request, res: Response) => {
    try {
        const views = await postViewService.getAllPostViews();
        res.json(views);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchPostView = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        const view = await postViewService.getPostViewById(id);
        if (!view) {
            return res.status(404).json({ message: "PostView not found" });
        }
        res.json(view);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createNewPostView = async (req: Request, res: Response) => {
    try {
        const { postId, userId } = req.body;
        const newView = await postViewService.createPostView(postId, userId);
        res.status(201).json(newView);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateExistingPostView = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        const { postId, userId } = req.body;
        const updatedView = await postViewService.updatePostView(id, postId, userId);
        res.json(updatedView);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteExistingPostView = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        await postViewService.deletePostView(id);
        res.json({ message: "PostView deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
