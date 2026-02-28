"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const Role_1 = require("../entities/Role");
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
// ✅ Get all users with role_name instead of full role object
const getAllUsers = async () => {
    const users = await userRepo
        .createQueryBuilder("user")
        .leftJoin("user.role", "role")
        .select([
        "user.id",
        "user.name",
        "user.email",
        "user.emailVerified",
        "user.image",
        "role.role_name",
        "user.createdAt",
        "user.updatedAt"
    ])
        .getRawMany();
    // Map the raw data into a cleaner structure
    return users.map((u) => ({
        id: u.user_id,
        name: u.user_name,
        email: u.user_email,
        emailVerified: u.user_emailVerified,
        image: u.user_image,
        role_name: u.role_role_name || null, // <-- Note the prefix "role_"!
        createdAt: u.user_createdAt,
        updatedAt: u.user_updatedAt,
    }));
};
exports.getAllUsers = getAllUsers;
// ✅ Get user by ID with role_name only
const getUserById = async (id) => {
    const user = await userRepo
        .createQueryBuilder("user")
        .leftJoin("user.role", "role")
        .select([
        "user.id",
        "user.name",
        "user.email",
        "user.emailVerified",
        "user.image",
        "role.role_name",
        "user.createdAt",
        "user.updatedAt"
    ])
        .addSelect("role.role_name", "role_name") // ✅ fixed
        .where("user.id = :id", { id })
        .getRawOne();
    if (!user)
        return null;
    return {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        emailVerified: user.user_emailVerified,
        image: user.user_image,
        role_name: user.role_role_name || null,
        createdAt: user.user_createdAt,
        updatedAt: user.user_updatedAt,
    };
};
exports.getUserById = getUserById;
const createUser = async (name, email, roleId, bio, social_links) => {
    if (!email)
        throw new Error("Email is required");
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser)
        throw new Error("User with this email already exists");
    const user = userRepo.create({
        name,
        email,
        bio: bio || null,
        social_links: social_links || null
    });
    // ✅ If roleId is provided, attach role
    if (roleId) {
        const roleRepo = data_source_1.AppDataSource.getRepository(Role_1.Role);
        const role = await roleRepo.findOne({ where: { id: roleId } });
        if (!role)
            throw new Error("Invalid role ID");
        user.role = role;
    }
    return userRepo.save(user);
};
exports.createUser = createUser;
// ✅ Update user
const updateUser = async (id, name, email, roleId, bio, social_links) => {
    const user = await userRepo.findOne({ where: { id }, relations: ["role"] });
    if (!user)
        throw new Error("User not found");
    if (email && email !== user.email) {
        const existingUser = await userRepo.findOne({ where: { email } });
        if (existingUser)
            throw new Error("Email already in use");
    }
    if (name !== undefined)
        user.name = name;
    if (bio !== undefined)
        user.bio = bio;
    if (social_links !== undefined)
        user.social_links = social_links;
    if (!email)
        throw new Error("Email is required");
    user.email = email;
    // ✅ Update role if provided
    if (roleId) {
        const roleRepo = data_source_1.AppDataSource.getRepository(Role_1.Role);
        const role = await roleRepo.findOne({ where: { id: roleId } });
        if (!role)
            throw new Error("Invalid role ID");
        user.role = role;
    }
    return userRepo.save(user);
};
exports.updateUser = updateUser;
// ✅ Delete user (unchanged)
const deleteUser = async (id) => {
    const user = await userRepo.findOne({ where: { id } });
    if (!user)
        throw new Error("User not found");
    await userRepo.remove(user);
    return { message: "User deleted" };
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map