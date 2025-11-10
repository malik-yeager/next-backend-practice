import { AppDataSource } from "../config/data-source";
import { Role } from "../entities/Role";
import { RolePermission } from "../entities/RolePermission";
import { ModulePermission } from "../entities/ModulePermission";

const roleRepo = AppDataSource.getRepository(Role);
const permissionRepo = AppDataSource.getRepository(RolePermission);
const modulePermissionRepo = AppDataSource.getRepository(ModulePermission);

// ✅ Helper: format role + permissions for clean JSON output
const formatRoleResponse = (role: Role) => {
  const formattedPermissions: Record<string, string[]> = {};

  for (const perm of role.permissions || []) {
    const actions: string[] = [];

    if (perm.create) actions.push("create");
    if (perm.read) actions.push("read");
    if (perm.update) actions.push("update");
    if (perm.delete) actions.push("delete");
    if (perm.fullAccess) actions.push("fullAccess");

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
export const getAllRoles = async () => {
  const roles = await roleRepo.find({ relations: ["permissions", "permissions.modulePermission"] });
  return roles.map(formatRoleResponse);
};

// ✅ Get a single role by ID
export const getRoleById = async (id: string) => {
  const role = await roleRepo.findOne({
    where: { id },
    relations: ["permissions", "permissions.modulePermission"],
  });
  if (!role) return null;
  return formatRoleResponse(role);
};

// ✅ Create a new role
export const createRole = async (
  role_name: string,
  permissions: Record<string, string[]> = {},
  description?: string
) => {
  const existing = await roleRepo.findOne({ where: { role_name } });
  if (existing) throw new Error("Role already exists");

  // Create and save the role first
  const role = roleRepo.create({ role_name, description: description ?? null });
  await roleRepo.save(role);

  const rolePermissions: RolePermission[] = [];

  if (permissions["*"]) {
    // ✅ Full Access case
    const perm = new RolePermission();
    perm.role = role;
    perm.modulePermission = null as any;
    perm.module_name = "*";
    perm.create = true;
    perm.read = true;
    perm.update = true;
    perm.delete = true;
    perm.fullAccess = true;
    rolePermissions.push(perm);
  } else {
    // ✅ Regular module-level permissions
    for (const [moduleName, actions] of Object.entries(permissions)) {
      const modulePerm = await modulePermissionRepo.findOne({
        where: { module_name: moduleName },
      });

      const perm = new RolePermission();
      perm.role = role;
      perm.modulePermission = modulePerm || null!;
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

// ✅ Update an existing role
export const updateRole = async (
  id: string,
  role_name?: string,
  description?: string,
  permissions?: Record<string, string[]>
) => {
  const role = await roleRepo.findOne({ where: { id }, relations: ["permissions"] });
  if (!role) throw new Error("Role not found");

  if (role_name) role.role_name = role_name;
  if (description !== undefined) role.description = description;

  if (permissions) {
    await permissionRepo.delete({ role: { id } });

    const newRolePermissions: RolePermission[] = [];

    if (permissions["*"]) {
      const perm = new RolePermission();
      perm.role = role;
      perm.modulePermission = null as any;
      perm.module_name = "*";
      perm.create = true;
      perm.read = true;
      perm.update = true;
      perm.delete = true;
      perm.fullAccess = true;
      newRolePermissions.push(perm);
    } else {
      for (const [moduleName, actions] of Object.entries(permissions)) {
        const modulePerm = await modulePermissionRepo.findOne({
          where: { module_name: moduleName },
        });

        const perm = new RolePermission();
        perm.role = role;
        perm.modulePermission = modulePerm || null!;
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

// ✅ Delete a role
export const deleteRole = async (id: string) => {
  const role = await roleRepo.findOne({ where: { id } });
  if (!role) throw new Error("Role not found");

  await roleRepo.remove(role);
  return { message: "Role deleted" };
};
