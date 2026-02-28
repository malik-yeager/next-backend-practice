"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("./ormconfig");
const User_1 = require("./entities/User");
const Account_1 = require("./entities/Account");
const Role_1 = require("./entities/Role");
const RolePermission_1 = require("./entities/RolePermission");
const ModulePermission_1 = require("./entities/ModulePermission");
const Post_1 = require("./entities/Post");
const Category_1 = require("./entities/Category");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auditLogger_1 = require("./utils/auditLogger");
const seed = async () => {
    try {
        await ormconfig_1.AppDataSource.initialize();
        console.log("✅ Database connected");
        const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
        const accountRepo = ormconfig_1.AppDataSource.getRepository(Account_1.Account);
        const roleRepo = ormconfig_1.AppDataSource.getRepository(Role_1.Role);
        const permissionRepo = ormconfig_1.AppDataSource.getRepository(RolePermission_1.RolePermission);
        const modulePermissionRepo = ormconfig_1.AppDataSource.getRepository(ModulePermission_1.ModulePermission);
        const postRepo = ormconfig_1.AppDataSource.getRepository(Post_1.Post);
        const categoryRepo = ormconfig_1.AppDataSource.getRepository(Category_1.Category);
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
        const passwordHash = await bcryptjs_1.default.hash("test1234", 10);
        const existingAccount = await accountRepo.findOneBy({
            provider: "credentials",
            providerAccountId: user.email,
        });
        if (!existingAccount) {
            const account = accountRepo.create({
                user,
                provider: "credentials",
                providerAccountId: user.email,
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
            await (0, auditLogger_1.auditLogger)({
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
    }
    catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
};
seed();
//# sourceMappingURL=seed.js.map