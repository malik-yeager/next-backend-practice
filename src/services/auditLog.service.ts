import { AppDataSource } from "../config/data-source";
import { AuditLog } from "../entities/AuditLog";
import { User } from "../entities/User";
import { ILike } from "typeorm";

const auditRepo = AppDataSource.getRepository(AuditLog);

// ✅ Get all audit logs (with filters + pagination)
export const getAllAuditLogs = async (
  page: number = 1,
  limit: number = 20,
  search?: string
) => {
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

// ✅ Get single audit log by ID
export const getAuditLogById = async (id: string) => {
  const log = await auditRepo.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!log) throw new Error("Audit log not found");
  return log;
};

// ✅ Delete audit log by ID
export const deleteAuditLog = async (id: string) => {
  const log = await auditRepo.findOne({ where: { id } });
  if (!log) throw new Error("Audit log not found");

  await auditRepo.remove(log);
  return { message: "Audit log deleted successfully" };
};

// ✅ Clear all logs (optional admin action)
export const clearAllAuditLogs = async () => {
  await auditRepo.clear();
  return { message: "All audit logs cleared" };
};
