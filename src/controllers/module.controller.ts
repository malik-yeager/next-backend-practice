import { Request, Response } from "express";
import * as moduleService from "../services/module.service";

export interface ModuleParams {
  id?: string;
}

export class ModuleController {
  // ✅ Get all modules
  async getAllModules(req: Request, res: Response) {
    try {
      const modules = await moduleService.getAllModules();
      res.json({
        status: "success",
        total: modules.length,
        data: modules,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get module by ID
  async getModuleById(req: Request<ModuleParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing module ID",
      });

    try {
      const module = await moduleService.getModuleById(id);
      if (!module)
        return res.status(404).json({
          status: "error",
          message: "Module not found",
        });

      res.json({
        status: "success",
        data: module,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Create new module
  async createModule(req: Request, res: Response) {
    const { module_name, description, available_actions } = req.body;

    if (!module_name)
      return res.status(400).json({
        status: "error",
        message: "Missing required field: module_name",
      });

    try {
      const module = await moduleService.createModule(
        module_name,
        description,
        available_actions
      );
      res.status(201).json({
        status: "success",
        data: module,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Update module by ID
  async updateModule(req: Request<ModuleParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing module ID",
      });

    const { module_name, description, available_actions } = req.body;

    try {
      const module = await moduleService.updateModule(id, {
        module_name,
        description,
        available_actions,
      });

      res.json({
        status: "success",
        data: module,
      });
    } catch (err: any) {
      if (err.message === "Module not found") {
        return res.status(404).json({
          status: "error",
          message: err.message,
        });
      }
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Delete module by ID
  async deleteModule(req: Request<ModuleParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing module ID",
      });

    try {
      const result = await moduleService.deleteModule(id);
      res.json({
        status: "success",
      });
    } catch (err: any) {
      if (err.message === "Module not found") {
        return res.status(404).json({
          status: "error",
          message: err.message,
        });
      }
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
}
