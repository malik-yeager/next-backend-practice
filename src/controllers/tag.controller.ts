import { Request, Response } from "express";
import * as tagService from "../services/tag.service";

export interface TagParams {
  id?: string;
}

export class TagController {
  // ✅ Get all tags
  async getAllTags(req: Request, res: Response) {
    try {
      const tags = await tagService.getAllTags();
      res.json({
        status: "success",
        total: tags.length,
        data: tags,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get tag by ID
  async getTagById(req: Request<TagParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing tag ID",
      });

    try {
      const tag = await tagService.getTagById(id);
      if (!tag)
        return res.status(404).json({
          status: "error",
          message: "Tag not found",
        });

      res.json({
        status: "success",
        data: tag,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Create tag
  async createTag(req: Request, res: Response) {
    const { name, slug, description } = req.body;

    if (!name || !slug)
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });

    try {
      const tag = await tagService.createTag(name, slug, description);
      res.status(201).json({
        status: "success",
        data: tag,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Update tag
  async updateTag(req: Request<TagParams>, res: Response) {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing tag ID",
      });

    try {
      const tag = await tagService.updateTag(id, name, slug, description);
      res.json({
        status: "success",
        data: tag,
      });
    } catch (err: any) {
      if (err.message === "Tag not found") {
        return res.status(404).json({
          status: "error",
          message: err.message,
        });
      }
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Delete tag
  async deleteTag(req: Request<TagParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing tag ID",
      });

    try {
      const result = await tagService.deleteTag(id);
      res.json({
        status: "success",
        message: result.message,
      });
    } catch (err: any) {
      if (err.message === "Tag not found") {
        return res.status(404).json({
          status: "error",
          message: err.message,
        });
      }
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}
