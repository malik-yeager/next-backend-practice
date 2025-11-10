// src/utils/auditLogger.ts
import { AppDataSource } from "../config/data-source";
import { AuditLog } from "../entities/AuditLog";
import { requestContext } from "../context/requestContext";

export async function auditLogger(params: {
  action: string;
  entity_name?: string | null;
  entity_id?: string | null;
  details?: Record<string, any> | null;
  endpoint?: string | null;
  ip_address?: string | null;
}) {
  try {
    const auditRepo = AppDataSource.getRepository(AuditLog);

    let user = null;
    try {
      // Only call if the context actually has getUser
      if (requestContext && typeof requestContext.getUser === "function") {
        user = requestContext.getUser() || null;
      }
    } catch {
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
  } catch (err) {
    console.error("❌ auditLogger error:", err);
  }
}
