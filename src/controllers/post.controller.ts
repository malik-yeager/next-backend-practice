import { Request, Response } from "express";
import * as postService from "../services/post.service";

export interface PostParams {
  id?: string;
}

export class PostController {
  // ✅ Get all posts
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts();
      res.json({
        status: "success",
        total: posts.length,
        data: posts,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get post by ID
  async getPostById(req: Request<PostParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ status: "error", message: "Missing post ID" });

    try {
      const post = await postService.getPostById(id);
      if (!post)
        return res.status(404).json({ status: "error", message: "Post not found" });

      res.json({
        status: "success",
        data: post,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get related posts
  async getRelatedPosts(req: Request<PostParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ status: "error", message: "Missing post ID" });

    try {
      const posts = await postService.getRelatedPosts(id);
      res.json({
        status: "success",
        data: posts,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Create new post
  async createPost(req: Request, res: Response) {
    try {
      const user = req.user as any;
      const isAdmin = user?.role?.role_name === 'admin';

      // If not admin, force author to be current user
      if (!isAdmin) {
        req.body.author_id = user.id;
      } else {
        // If admin, they CAN specify author_id. If they don't, fallback to their own ID
        if (!req.body.author_id) {
          req.body.author_id = user.id;
        }
      }

      const post = await postService.createPost(req.body);
      res.status(201).json({
        status: "success",
        data: post,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Update post
  async updatePost(req: Request<PostParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ status: "error", message: "Missing post ID" });

    try {
      const post = await postService.updatePost(id, req.body);
      res.json({
        status: "success",
        data: post,
      });
    } catch (err: any) {
      const code = err.message === "Post not found" ? 404 : 400;
      res.status(code).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Delete post
  async deletePost(req: Request<PostParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ status: "error", message: "Missing post ID" });

    try {
      const result = await postService.deletePost(id);
      res.json({
        status: "success",
        message: result.message,
      });
    } catch (err: any) {
      const code = err.message === "Post not found" ? 404 : 400;
      res.status(code).json({
        status: "error",
        message: err.message,
      });
    }
  }
}
