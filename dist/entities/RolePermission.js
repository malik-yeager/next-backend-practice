"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermission = void 0;
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
const ModulePermission_1 = require("./ModulePermission");
let RolePermission = class RolePermission {
};
exports.RolePermission = RolePermission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RolePermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, (role) => role.permissions, { onDelete: "CASCADE" }),
    __metadata("design:type", Role_1.Role)
], RolePermission.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ModulePermission_1.ModulePermission, (mp) => mp.rolePermissions, {
        eager: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", ModulePermission_1.ModulePermission)
], RolePermission.prototype, "modulePermission", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], RolePermission.prototype, "module_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], RolePermission.prototype, "create", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], RolePermission.prototype, "read", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], RolePermission.prototype, "update", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], RolePermission.prototype, "delete", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], RolePermission.prototype, "fullAccess", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], RolePermission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], RolePermission.prototype, "updatedAt", void 0);
exports.RolePermission = RolePermission = __decorate([
    (0, typeorm_1.Entity)({ name: "role_permissions" }),
    (0, typeorm_1.Unique)(["role", "modulePermission"]) // ✅ One entry per module per role
], RolePermission);
//# sourceMappingURL=RolePermission.js.map