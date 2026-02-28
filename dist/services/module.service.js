"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModule = exports.updateModule = exports.createModule = exports.getModuleById = exports.getAllModules = void 0;
const data_source_1 = require("../config/data-source");
const ModulePermission_1 = require("../entities/ModulePermission");
const moduleRepo = data_source_1.AppDataSource.getRepository(ModulePermission_1.ModulePermission);
// 🟢 Get all modules
const getAllModules = async () => {
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
exports.getAllModules = getAllModules;
// 🟢 Get module by ID
const getModuleById = async (id) => {
    const m = await moduleRepo.findOne({ where: { id } });
    if (!m)
        throw new Error("Module not found");
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
exports.getModuleById = getModuleById;
// 🟢 Create new module
const createModule = async (module_name, description, available_actions) => {
    const existing = await moduleRepo.findOne({ where: { module_name } });
    if (existing)
        throw new Error("Module already exists");
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
    return (0, exports.getModuleById)(module.id);
};
exports.createModule = createModule;
// 🟢 Update module
const updateModule = async (id, updates) => {
    const module = await moduleRepo.findOne({ where: { id } });
    if (!module)
        throw new Error("Module not found");
    if (updates.module_name)
        module.module_name = updates.module_name;
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
    return (0, exports.getModuleById)(id);
};
exports.updateModule = updateModule;
// 🟢 Delete module
const deleteModule = async (id) => {
    const module = await moduleRepo.findOne({ where: { id } });
    if (!module)
        throw new Error("Module not found");
    await moduleRepo.remove(module);
};
exports.deleteModule = deleteModule;
//# sourceMappingURL=module.service.js.map