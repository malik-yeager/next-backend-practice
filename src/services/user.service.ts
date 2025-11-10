import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

const userRepo = AppDataSource.getRepository(User);

// ✅ Get all users with role_name instead of full role object
export const getAllUsers = async () => {
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

// ✅ Get user by ID with role_name only
export const getUserById = async (id: string) => {
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

  if (!user) return null;

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


export const createUser = async (name: string, email: string, roleId?: string | null) => {
  if (!email) throw new Error("Email is required");

  const existingUser = await userRepo.findOne({ where: { email } });
  if (existingUser) throw new Error("User with this email already exists");

  const user = userRepo.create({
    name,
    email,
  });

  // ✅ If roleId is provided, attach role
  if (roleId) {
    const roleRepo = AppDataSource.getRepository(Role);
    const role = await roleRepo.findOne({ where: { id: roleId } });
    if (!role) throw new Error("Invalid role ID");
    user.role = role;
  }

  return userRepo.save(user);
};


// ✅ Update user (unchanged)
export const updateUser = async (
  id: string,
  name?: string | null,
  email?: string | null,
  roleId?: string | null
) => {
  const user = await userRepo.findOne({ where: { id }, relations: ["role"] });
  if (!user) throw new Error("User not found");

  if (email && email !== user.email) {
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already in use");
  }

  if (name !== undefined) user.name = name;
  if (!email) throw new Error("Email is required");
  user.email = email;

  // ✅ Update role if provided
  if (roleId) {
    const roleRepo = AppDataSource.getRepository(Role);
    const role = await roleRepo.findOne({ where: { id: roleId } });
    if (!role) throw new Error("Invalid role ID");
    user.role = role;
  }

  return userRepo.save(user);
};

// ✅ Delete user (unchanged)
export const deleteUser = async (id: string) => {
  const user = await userRepo.findOne({ where: { id } });
  if (!user) throw new Error("User not found");
  await userRepo.remove(user);
  return { message: "User deleted" };
};
