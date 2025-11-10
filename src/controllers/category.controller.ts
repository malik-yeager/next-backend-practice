import { Request, Response } from "express";
import * as categoryService from "../services/category.service";

export interface CategoryParams {
  id?: string;
}

export class CategoryController {
  // ✅ Get all
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json({
        status: "success",
        total: categories.length,
        data: categories,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get by ID
  async getCategoryById(req: Request<CategoryParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing category ID",
      });

    try {
      const category = await categoryService.getCategoryById(id);
      if (!category)
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });

      res.json({
        status: "success",
        data: category,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Create
  async createCategory(req: Request, res: Response) {
    const { name, slug, description } = req.body;

    if (!name || !slug)
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });

    try {
      const category = await categoryService.createCategory(name, slug, description);
      res.status(201).json({
        status: "success",
        data: category,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Update
  async updateCategory(req: Request<CategoryParams>, res: Response) {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing category ID",
      });

    try {
      const category = await categoryService.updateCategory(id, name, slug, description);
      res.json({
        status: "success",
        data: category,
      });
    } catch (err: any) {
      if (err.message === "Category not found") {
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

  // ✅ Delete
  async deleteCategory(req: Request<CategoryParams>, res: Response) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing category ID",
      });

    try {
      const result = await categoryService.deleteCategory(id);
      res.json({
        status: "success",
        message: result.message,
      });
    } catch (err: any) {
      if (err.message === "Category not found") {
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
