"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditSubscriber = void 0;
const typeorm_1 = require("typeorm");
const requestContext_1 = require("../context/requestContext");
const AuditLog_1 = require("../entities/AuditLog");
let AuditSubscriber = class AuditSubscriber {
    listenTo() {
        // Listen for all entities
        return Object;
    }
    isTrackable(entity) {
        return entity && ("created_by" in entity || "updated_by" in entity);
    }
    async beforeInsert(event) {
        // 🚫 Skip audit for the AuditLog entity itself
        if (event.metadata.name === "AuditLog")
            return;
        const user = requestContext_1.requestContext.getUser?.() || null;
        const entity = event.entity;
        if (!entity)
            return;
        // ✅ Set created/updated fields
        if (this.isTrackable(entity)) {
            entity.createdBy = user;
            entity.updatedBy = user;
            entity.created_by = user?.id || null;
            entity.updated_by = user?.id || null;
        }
        // ✅ Schedule audit save *outside* this transaction to avoid recursion
        setImmediate(async () => {
            try {
                const log = new AuditLog_1.AuditLog();
                log.user_id = user?.id || null;
                log.action = "CREATE";
                log.entity_name = event.metadata.name;
                log.entity_id = entity?.id || null;
                log.details = entity;
                await event.manager.connection.getRepository(AuditLog_1.AuditLog).save(log);
            }
            catch (err) {
                console.error("AuditSubscriber beforeInsert error:", err);
            }
        });
    }
    async beforeUpdate(event) {
        if (event.metadata.name === "AuditLog")
            return;
        const user = requestContext_1.requestContext.getUser?.() || null;
        const entity = event.entity;
        if (!entity)
            return;
        if (this.isTrackable(entity)) {
            entity.updatedBy = user;
            entity.updated_by = user?.id || null;
        }
        const diff = {};
        if (event.updatedColumns?.length) {
            for (const col of event.updatedColumns) {
                diff[col.propertyName] = {
                    old: event.databaseEntity?.[col.propertyName],
                    new: event.entity?.[col.propertyName],
                };
            }
        }
        setImmediate(async () => {
            try {
                const log = new AuditLog_1.AuditLog();
                log.user_id = user?.id || null;
                log.action = "UPDATE";
                log.entity_name = event.metadata.name;
                log.entity_id = entity?.id || null;
                log.details = Object.keys(diff).length ? diff : null;
                await event.manager.connection.getRepository(AuditLog_1.AuditLog).save(log);
            }
            catch (err) {
                console.error("AuditSubscriber beforeUpdate error:", err);
            }
        });
    }
    async beforeRemove(event) {
        if (event.metadata?.name === "AuditLog")
            return;
        setImmediate(async () => {
            try {
                const log = new AuditLog_1.AuditLog();
                log.action = "DELETE";
                log.entity_name = event.metadata?.name || null;
                log.entity_id = event.entity?.id || null;
                log.details = event.entity || null;
                await event.manager.connection.getRepository(AuditLog_1.AuditLog).save(log);
            }
            catch (err) {
                console.error("AuditSubscriber beforeRemove error:", err);
            }
        });
    }
};
exports.AuditSubscriber = AuditSubscriber;
exports.AuditSubscriber = AuditSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], AuditSubscriber);
//# sourceMappingURL=AuditSubscriber.js.map