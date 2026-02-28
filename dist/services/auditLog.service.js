"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAllAuditLogs = exports.deleteAuditLog = exports.getAuditLogById = exports.getAllAuditLogs = void 0;
const data_source_1 = require("../config/data-source");
const AuditLog_1 = require("../entities/AuditLog");
const auditRepo = data_source_1.AppDataSource.getRepository(AuditLog_1.AuditLog);
// ✅ Get all audit logs (with filters + pagination)
const getAllAuditLogs = async (page = 1, limit = 20, search) => {
    const skip = (page - 1) * limit;
    const query = auditRepo
        .createQueryBuilder("log")
        .leftJoinAndSelect("log.user", "user")
        .select([
        "log.id",
        "log.action",
        "log.entity_name",
        "log.entity_id",
        "log.details",
        "log.endpoint",
        "log.ip_address",
        "log.created_at",
        "user.id",
        "user.name",
        "user.email",
    ])
        .orderBy("log.created_at", "DESC")
        .skip(skip)
        .take(limit);
    // Optional search
    if (search) {
        query.where("log.entity_name ILIKE :search OR log.action ILIKE :search", {
            search: `%${search}%`,
        });
    }
    const [data, total] = await query.getManyAndCount();
    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getAllAuditLogs = getAllAuditLogs;
// ✅ Get single audit log by ID
const getAuditLogById = async (id) => {
    const log = await auditRepo.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!log)
        throw new Error("Audit log not found");
    return log;
};
exports.getAuditLogById = getAuditLogById;
// ✅ Delete audit log by ID
const deleteAuditLog = async (id) => {
    const log = await auditRepo.findOne({ where: { id } });
    if (!log)
        throw new Error("Audit log not found");
    await auditRepo.remove(log);
    return { message: "Audit log deleted successfully" };
};
exports.deleteAuditLog = deleteAuditLog;
// ✅ Clear all logs (optional admin action)
const clearAllAuditLogs = async () => {
    await auditRepo.clear();
    return { message: "All audit logs cleared" };
};
exports.clearAllAuditLogs = clearAllAuditLogs;
//# sourceMappingURL=auditLog.service.js.map