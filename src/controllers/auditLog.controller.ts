import { Request, Response } from "express";
import * as auditService from "../services/auditLog.service";

export class AuditLogController {
  // ✅ Get all audit logs
  async getAll(req: Request, res: Response) {
    const { page = "1", limit = "20", search } = req.query;

    try {
      const result = await auditService.getAllAuditLogs(
        parseInt(page as string),
        parseInt(limit as string),
        search as string
      );

      res.json({
        status: "success",
        ...result,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // ✅ Get one audit log by ID
  async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing audit log ID",
      });

    try {
      const log = await auditService.getAuditLogById(id);
      res.json({
        status: "success",
        data: log,
      });
    } catch (err: any) {
      if (err.message === "Audit log not found") {
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

  // ✅ Delete one log
  async deleteById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing audit log ID",
      });

    try {
      const result = await auditService.deleteAuditLog(id);
      res.json({
        status: "success",
        message: result.message,
      });
    } catch (err: any) {
      if (err.message === "Audit log not found") {
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

  // ✅ Clear all logs (admin)
  async clearAll(req: Request, res: Response) {
    try {
      const result = await auditService.clearAllAuditLogs();
      res.json({
        status: "success",
        message: result.message,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}
