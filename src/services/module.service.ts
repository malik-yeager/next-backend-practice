import { AppDataSource } from "../config/data-source";
import { ModulePermission } from "../entities/ModulePermission";

const moduleRepo = AppDataSource.getRepository(ModulePermission);

// 🟢 Get all modules
export const getAllModules = async () => {
  const modules = await moduleRepo.find();
  return modules.map((m) => ({
    id: m.id,
    module_name: m.module_name,
    description: m.description,
    available_actions: [
      ...(m.create ? ["create"] : []),
      ...(m.read ? ["read"] : []),
      ...(m.update ? ["update"] : []),
      ...(m.delete ? ["delete"] : []),
      ...(m.fullAccess ? ["fullAccess"] : []),
    ],
  }));
};

// 🟢 Get module by ID
export const getModuleById = async (id: string) => {
  const m = await moduleRepo.findOne({ where: { id } });
  if (!m) throw new Error("Module not found");

  return {
    id: m.id,
    module_name: m.module_name,
    description: m.description,
    available_actions: [
      ...(m.create ? ["create"] : []),
      ...(m.read ? ["read"] : []),
      ...(m.update ? ["update"] : []),
      ...(m.delete ? ["delete"] : []),
      ...(m.fullAccess ? ["fullAccess"] : []),
    ],
  };
};

// 🟢 Create new module
export const createModule = async (
  module_name: string,
  description?: string,
  available_actions?: string[]
) => {
  const existing = await moduleRepo.findOne({ where: { module_name } });
  if (existing) throw new Error("Module already exists");

  const module = moduleRepo.create({
    module_name,
    description: description ?? null,
    create: available_actions?.includes("create") ?? true,
    read: available_actions?.includes("read") ?? true,
    update: available_actions?.includes("update") ?? true,
    delete: available_actions?.includes("delete") ?? true,
    fullAccess: available_actions?.includes("fullAccess") ?? true,
  });

  await moduleRepo.save(module);
  return getModuleById(module.id);
};

// 🟢 Update module
export const updateModule = async (
  id: string,
  updates: Partial<{
    module_name: string;
    description: string;
    available_actions: string[];
  }>
) => {
  const module = await moduleRepo.findOne({ where: { id } });
  if (!module) throw new Error("Module not found");

  if (updates.module_name) module.module_name = updates.module_name;
  if (updates.description !== undefined)
    module.description = updates.description;

  if (updates.available_actions) {
    module.create = updates.available_actions.includes("create");
    module.read = updates.available_actions.includes("read");
    module.update = updates.available_actions.includes("update");
    module.delete = updates.available_actions.includes("delete");
    module.fullAccess = updates.available_actions.includes("fullAccess");
  }

  await moduleRepo.save(module);
  return getModuleById(id);
};

// 🟢 Delete module
export const deleteModule = async (id: string) => {
  const module = await moduleRepo.findOne({ where: { id } });
  if (!module) throw new Error("Module not found");

  await moduleRepo.remove(module);
};
