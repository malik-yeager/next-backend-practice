import { AppDataSource } from "./ormconfig";
import { User } from "./entities/User";
import { Account } from "./entities/Account";
import { Role } from "./entities/Role";
import { RolePermission } from "./entities/RolePermission";
import { ModulePermission } from "./entities/ModulePermission";
import { Post } from "./entities/Post";
import { Category } from "./entities/Category";
import bcrypt from "bcryptjs";
import { auditLogger } from "./utils/auditLogger";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    const userRepo = AppDataSource.getRepository(User);
    const accountRepo = AppDataSource.getRepository(Account);
    const roleRepo = AppDataSource.getRepository(Role);
    const permissionRepo = AppDataSource.getRepository(RolePermission);
    const modulePermissionRepo = AppDataSource.getRepository(ModulePermission);
    const postRepo = AppDataSource.getRepository(Post);
    const categoryRepo = AppDataSource.getRepository(Category);

    // 1️⃣ Admin Role
    let adminRole = await roleRepo.findOne({ where: { role_name: "Admin" } });
    if (!adminRole) {
      adminRole = roleRepo.create({
        role_name: "Admin",
        description: "Full access administrator",
      });
      await roleRepo.save(adminRole);
      console.log("✅ Admin role created");
    }

    // 2️⃣ Global Modules
    const defaultModules = ["Users", "Roles", "Dashboard", "Posts"];
    for (const moduleName of defaultModules) {
      let modulePerm = await modulePermissionRepo.findOne({
        where: { module_name: moduleName },
      });

      if (!modulePerm) {
        modulePerm = modulePermissionRepo.create({
          module_name: moduleName,
          description: `${moduleName} management`,
        });
        await modulePermissionRepo.save(modulePerm);
        console.log(`✅ ModulePermission created for module: ${moduleName}`);
      }

      const existing = await permissionRepo.findOne({
        where: {
          role: { id: adminRole.id },
          modulePermission: { id: modulePerm.id },
        },
        relations: ["role", "modulePermission"],
      });

      if (!existing) {
        const perm = permissionRepo.create({
          role: adminRole,
          modulePermission: modulePerm,
          module_name: moduleName,
          create: true,
          read: true,
          update: true,
          delete: true,
          fullAccess: true,
        });
        await permissionRepo.save(perm);
        console.log(`✅ Full access granted for ${moduleName}`);
      }
    }

    // 3️⃣ Admin user
    let user = await userRepo.findOne({ where: { email: "test@example.com" } });
    if (!user) {
      user = userRepo.create({
        name: "Test User",
        email: "test@example.com",
        role: adminRole,
      });
      await userRepo.save(user);
      console.log("✅ Test user created");
    }

    // 4️⃣ Password + Account
    const passwordHash = await bcrypt.hash("test1234", 10);
    const existingAccount = await accountRepo.findOneBy({
      provider: "credentials",
      providerAccountId: user.email!,
    });

    if (!existingAccount) {
      const account = accountRepo.create({
        user,
        provider: "credentials",
        providerAccountId: user.email!,
        type: "credentials",
        password: passwordHash,
      });
      await accountRepo.save(account);
      console.log("✅ Credentials account created");
    }

    // 5️⃣ Default Post
    const existingPost = await postRepo.findOne({ where: { slug: "welcome-to-our-blog" } });
    if (!existingPost) {
      const post = postRepo.create({
        slug: "welcome-to-our-blog",
        title: "Welcome to Our Blog",
        excerpt: "This is the first post on our brand new platform!",
        thumbnail: "https://example.com/images/welcome.jpg",
        content: {
          time: Date.now(),
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Welcome to our first post! This blog is powered by our new CMS backend.",
              },
            },
          ],
        },
        status: "published",
        visibility: "public",
        tags: ["welcome", "intro"],
        categories: ["general"],
        meta: {
          seoTitle: "Welcome to Our Blog",
          seoDescription: "Introductory post about our new platform",
        },
        author: user,
        createdBy: user,
        updatedBy: user,
      });
      await postRepo.save(post);
      console.log("✅ Default post created");
    }

    // 6️⃣ NEW: Default Category + Audit
    const existingCategory = await categoryRepo.findOne({
      where: { slug: "general" },
    });

    if (!existingCategory) {
      const category = categoryRepo.create({
        name: "General",
        slug: "general",
        description: "General articles and updates",
        createdBy: user,
        updatedBy: user,
      });

      await categoryRepo.save(category);
      console.log("✅ Default category created");

      // 🔍 Audit log entry
      await auditLogger({
        action: "CREATE",
        entity_name: "Category",
        entity_id: category.id,
        details: {
          name: category.name,
          slug: category.slug,
          description: category.description,
        },
        endpoint: "seed-script",
        ip_address: "127.0.0.1",
      });

      console.log("🧾 Audit log added for category creation");
    }

    console.log("🌱 Seed completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seed();
