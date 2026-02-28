"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const passport_1 = __importDefault(require("./lib/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const module_routes_1 = __importDefault(require("./routes/module.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const tag_routes_1 = __importDefault(require("./routes/tag.routes"));
const auditLog_routes_1 = __importDefault(require("./routes/auditLog.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const newsletter_routes_1 = __importDefault(require("./routes/newsletter.routes"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const requestContextMiddleware_1 = require("./middlewares/requestContextMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true, // Reflects the request origin, effectively allowing all origins
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express_1.default.json());
// PostgreSQL pool for sessions
const pgPool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
app.use((0, express_session_1.default)({
    store: new ((0, connect_pg_simple_1.default)(express_session_1.default))({
        pool: pgPool,
        tableName: "express_sessions",
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));
// Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// ✅ Must come after passport so we can access req.user
app.use(requestContextMiddleware_1.requestContextMiddleware);
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/roles", role_routes_1.default);
app.use("/api/modules", module_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/tags", tag_routes_1.default);
app.use("/api/auditlogs", auditLog_routes_1.default);
const draft_routes_1 = __importDefault(require("./routes/draft.routes"));
// ... existing code ...
app.use("/api/posts", post_routes_1.default);
app.use("/api/drafts", draft_routes_1.default); // Register draft routes
app.use("/api/newsletter", newsletter_routes_1.default);
console.log("✅ App configured");
exports.default = app;
//# sourceMappingURL=app.js.map