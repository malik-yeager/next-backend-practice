// src/app.ts
import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import passport from "./lib/passport";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import rolesRoutes from "./routes/role.routes";
import moduleRoutes from "./routes/module.routes";
import categoryRoutes from "./routes/category.routes";
import tagRoutes from "./routes/tag.routes";
import auditLogRoutes from "./routes/auditLog.routes";
import postRoutes from "./routes/post.routes"
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";
import { requestContextMiddleware } from "./middlewares/requestContextMiddleware";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const app = express();

// ✅ Step 1: Initialize DataSource before using it
AppDataSource.initialize()
  .then(() => {
    app.use(express.json());

    // PostgreSQL pool for sessions
    const pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    app.use(
      session({
        store: new (pgSession(session))({
          pool: pgPool,
          tableName: "express_sessions",
          createTableIfMissing: true,
        }),
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
      })
    );

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // ✅ Must come after passport so we can access req.user
    app.use(requestContextMiddleware);

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/roles", rolesRoutes);
    app.use("/api/modules", moduleRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/tags", tagRoutes);
    app.use("/api/auditlogs", auditLogRoutes);
    app.use("/api/posts", postRoutes);

    console.log("✅ App initialized");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

export default app;
