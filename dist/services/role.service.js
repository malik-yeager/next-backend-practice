"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const data_source_1 = require("../config/data-source");
const Role_1 = require("../entities/Role");
const RolePermission_1 = require("../entities/RolePermission");
const ModulePermission_1 = require("../entities/ModulePermission");
const roleRepo = data_source_1.AppDataSource.getRepository(Role_1.Role);
const permissionRepo = data_source_1.AppDataSource.getRepository(RolePermission_1.RolePermission);
const modulePermissionRepo = data_source_1.AppDataSource.getRepository(ModulePermission_1.ModulePermission);
// ✅ Helper: format role + permissions for clean JSON output
const formatRoleResponse = (role) => {
    const formattedPermissions = {};
    for (const perm of role.permissions || []) {
        const actions = [];
        if (perm.create)
            actions.push("create");
        if (perm.read)
            actions.push("read");
        if (perm.update)
            actions.push("update");
        if (perm.delete)
            actions.push("delete");
        if (perm.fullAccess)
            actions.push("fullAccess");
        formattedPermissions[perm.module_name.toLowerCase()] = actions;
    }
    return {
        id: role.id,
        role_name: role.role_name,
        description: role.description,
        permissions: formattedPermissions,
    };
};
// ✅ Get all roles with permissions
const getAllRoles = async () => {
    const roles = await roleRepo.find({ relations: ["permissions", "permissions.modulePermission"] });
    return roles.map(formatRoleResponse);
};
exports.getAllRoles = getAllRoles;
// ✅ Get a single role by ID
const getRoleById = async (id) => {
    const role = await roleRepo.findOne({
        where: { id },
        relations: ["permissions", "permissions.modulePermission"],
    });
    if (!role)
        return null;
    return formatRoleResponse(role);
};
exports.getRoleById = getRoleById;
// ✅ Create a new role
const createRole = async (role_name, permissions = {}, description) => {
    const existing = await roleRepo.findOne({ where: { role_name } });
    if (existing)
        throw new Error("Role already exists");
    // Create and save the role first
    const role = roleRepo.create({ role_name, description: description ?? null });
    await roleRepo.save(role);
    const rolePermissions = [];
    if (permissions["*"]) {
        // ✅ Full Access case
        const perm = new RolePermission_1.RolePermission();
        perm.role = role;
        perm.modulePermission = null;
        perm.module_name = "*";
        perm.create = true;
        perm.read = true;
        perm.update = true;
        perm.delete = true;
        perm.fullAccess = true;
        rolePermissions.push(perm);
    }
    else {
        // ✅ Regular module-level permissions
        for (const [moduleName, actions] of Object.entries(permissions)) {
            const modulePerm = await modulePermissionRepo.findOne({
                where: { module_name: moduleName },
            });
            const perm = new RolePermission_1.RolePermission();
            perm.role = role;
            perm.modulePermission = modulePerm || null;
            perm.module_name = moduleName;
            perm.create = actions.includes("create");
            perm.read = actions.includes("read");
            perm.update = actions.includes("update");
            perm.delete = actions.includes("delete");
            perm.fullAccess = actions.includes("fullAccess");
            rolePermissions.push(perm);
        }
    }
    await permissionRepo.save(rolePermissions);
    role.permissions = rolePermissions;
    const savedRole = await roleRepo.save(role);
    return formatRoleResponse(savedRole);
};
exports.createRole = createRole;
// ✅ Update an existing role
const updateRole = async (id, role_name, description, permissions) => {
    const role = await roleRepo.findOne({ where: { id }, relations: ["permissions"] });
    if (!role)
        throw new Error("Role not found");
    if (role_name)
        role.role_name = role_name;
    if (description !== undefined)
        role.description = description;
    if (permissions) {
        await permissionRepo.delete({ role: { id } });
        const newRolePermissions = [];
        if (permissions["*"]) {
            const perm = new RolePermission_1.RolePermission();
            perm.role = role;
            perm.modulePermission = null;
            perm.module_name = "*";
            perm.create = true;
            perm.read = true;
            perm.update = true;
            perm.delete = true;
            perm.fullAccess = true;
            newRolePermissions.push(perm);
        }
        else {
            for (const [moduleName, actions] of Object.entries(permissions)) {
                const modulePerm = await modulePermissionRepo.findOne({
                    where: { module_name: moduleName },
                });
                const perm = new RolePermission_1.RolePermission();
                perm.role = role;
                perm.modulePermission = modulePerm || null;
                perm.module_name = moduleName;
                perm.create = actions.includes("create");
                perm.read = actions.includes("read");
                perm.update = actions.includes("update");
                perm.delete = actions.includes("delete");
                perm.fullAccess = actions.includes("fullAccess");
                newRolePermissions.push(perm);
            }
        }
        await permissionRepo.save(newRolePermissions);
        role.permissions = newRolePermissions;
    }
    const savedRole = await roleRepo.save(role);
    return formatRoleResponse(savedRole);
};
exports.updateRole = updateRole;
// ✅ Delete a role
const deleteRole = async (id) => {
    const role = await roleRepo.findOne({ where: { id } });
    if (!role)
        throw new Error("Role not found");
    await roleRepo.remove(role);
    return { message: "Role deleted" };
};
exports.deleteRole = deleteRole;
//# sourceMappingURL=role.service.js.map