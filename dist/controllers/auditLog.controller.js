"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogController = void 0;
const auditService = __importStar(require("../services/auditLog.service"));
class AuditLogController {
    // ✅ Get all audit logs
    async getAll(req, res) {
        const { page = "1", limit = "20", search } = req.query;
        try {
            const result = await auditService.getAllAuditLogs(parseInt(page), parseInt(limit), search);
            res.json({
                status: "success",
                ...result,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
    // ✅ Get one audit log by ID
    async getById(req, res) {
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
        }
        catch (err) {
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
    async deleteById(req, res) {
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
        }
        catch (err) {
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
    async clearAll(req, res) {
        try {
            const result = await auditService.clearAllAuditLogs();
            res.json({
                status: "success",
                message: result.message,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
}
exports.AuditLogController = AuditLogController;
//# sourceMappingURL=auditLog.controller.js.map