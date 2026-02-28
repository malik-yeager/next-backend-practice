"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./entities/User");
const Account_1 = require("./entities/Account");
const Session_1 = require("./entities/Session");
const Verification_1 = require("./entities/Verification");
const Role_1 = require("./entities/Role");
const RolePermission_1 = require("./entities/RolePermission");
const ModulePermission_1 = require("./entities/ModulePermission");
const Category_1 = require("./entities/Category");
const Tag_1 = require("./entities/Tag");
const Post_1 = require("./entities/Post");
const AuditLog_1 = require("./entities/AuditLog");
const Subscriber_1 = require("./entities/Subscriber");
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env");
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL, // safe now
    synchronize: true,
    logging: true,
    entities: [User_1.User, Account_1.Account, Session_1.Session, Verification_1.VerificationToken, Role_1.Role, RolePermission_1.RolePermission, ModulePermission_1.ModulePermission, Category_1.Category, Tag_1.Tag, Post_1.Post, AuditLog_1.AuditLog, Subscriber_1.Subscriber],
});
//# sourceMappingURL=ormconfig.js.map