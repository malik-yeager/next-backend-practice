import { Request, Response } from "express";
import * as postTagService from "../services/postTag.service";

export const fetchPostTags = async (req: Request, res: Response) => {
    try {
        const tags = await postTagService.getAllPostTags();
        res.json(tags);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchPostTag = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;
        if (!postId || !tagId) {
            return res.status(400).json({ message: "Missing postId or tagId" });
        }
        const tag = await postTagService.getPostTagById(postId, Number(tagId));
        if (!tag) {
            return res.status(404).json({ message: "PostTag not found" });
        }
        res.json(tag);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createNewPostTag = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.body;
        const newTag = await postTagService.createPostTag(postId, Number(tagId));
        res.status(201).json(newTag);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteExistingPostTag = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;
        if (!postId || !tagId) {
            return res.status(400).json({ message: "Missing postId or tagId" });
        }
        await postTagService.deletePostTag(postId, Number(tagId));
        res.json({ message: "PostTag deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
