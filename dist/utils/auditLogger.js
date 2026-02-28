"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = auditLogger;
// src/utils/auditLogger.ts
const data_source_1 = require("../config/data-source");
const AuditLog_1 = require("../entities/AuditLog");
const requestContext_1 = require("../context/requestContext");
async function auditLogger(params) {
    try {
        const auditRepo = data_source_1.AppDataSource.getRepository(AuditLog_1.AuditLog);
        let user = null;
        try {
            // Only call if the context actually has getUser
            if (requestContext_1.requestContext && typeof requestContext_1.requestContext.getUser === "function") {
                user = requestContext_1.requestContext.getUser() || null;
            }
        }
        catch {
            // Ignore if called outside a request (like seed)
            user = null;
        }
        const log = auditRepo.create({
            user,
            user_id: user?.id || null,
            action: params.action,
            entity_name: params.entity_name || null,
            entity_id: params.entity_id || null,
            details: params.details
                ? JSON.parse(JSON.stringify(params.details))
                : null,
            endpoint: params.endpoint || null,
            ip_address: params.ip_address || null,
        });
        await auditRepo.save(log);
        // Optional: log for debugging
        console.log("✅ Audit log saved:", params.action, params.entity_name);
    }
    catch (err) {
        console.error("❌ auditLogger error:", err);
    }
}
//# sourceMappingURL=auditLogger.js.map