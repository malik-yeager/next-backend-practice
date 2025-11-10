import { Request, Response } from "express";
import * as roleService from "../services/role.service";

export interface RoleParams {
  id?: string;
}

export class RoleController {
  // ✅ Get all roles
  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.getAllRoles();
      res.json({
        status: "success",
        total: roles.length,
        data: roles,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get role by ID
  async getRoleById(req: Request<RoleParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing role ID",
      });

    try {
      const role = await roleService.getRoleById(id);
      if (!role)
        return res.status(404).json({
          status: "error",
          message: "Role not found",
        });

      res.json({
        status: "success",
        data: role,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async createRole(req: Request, res: Response) {
    const { role_name, description, permissions } = req.body;
  
    if (!role_name)
      return res.status(400).json({
        status: "error",
        message: "Missing required field: role_name",
      });
  
    try {
      const role = await roleService.createRole(role_name, permissions, description);
      res.status(201).json({
        status: "success",
        data: role,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
  
  // ✅ Update role by ID
  async updateRole(req: Request<RoleParams>, res: Response) {
    const { id } = req.params;
    const { role_name, description, permissions } = req.body;
  
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing role ID",
      });
  
    try {
      const role = await roleService.updateRole(id, role_name, description, permissions);
      res.json({
        status: "success",
        data: role,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
  

  // ✅ Delete role by ID
  async deleteRole(req: Request<RoleParams>, res: Response) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing role ID",
      });

    try {
      const result = await roleService.deleteRole(id);
      res.json({
        status: "success",
        message: result.message,
      });
    } catch (err: any) {
      if (err.message === "Role not found") {
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
