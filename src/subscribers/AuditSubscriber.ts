import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";
import { requestContext } from "../context/requestContext";
import { AuditLog } from "../entities/AuditLog";
import { BaseEntity } from "../entities/BaseEntity";

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  listenTo() {
    // Listen for all entities
    return Object;
  }

  private isTrackable(entity: any): entity is BaseEntity {
    return entity && ("created_by" in entity || "updated_by" in entity);
  }

  async beforeInsert(event: InsertEvent<any>) {
    // 🚫 Skip audit for the AuditLog entity itself
    if (event.metadata.name === "AuditLog") return;

    const user = requestContext.getUser?.() || null;
    const entity = event.entity;
    if (!entity) return;

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
        const log = new AuditLog();
        log.user_id = user?.id || null;
        log.action = "CREATE";
        log.entity_name = event.metadata.name;
        log.entity_id = entity?.id || null;
        log.details = entity;

        await event.manager.connection.getRepository(AuditLog).save(log);
      } catch (err) {
        console.error("AuditSubscriber beforeInsert error:", err);
      }
    });
  }

  async beforeUpdate(event: UpdateEvent<any>) {
    if (event.metadata.name === "AuditLog") return;

    const user = requestContext.getUser?.() || null;
    const entity = event.entity;
    if (!entity) return;

    if (this.isTrackable(entity)) {
      entity.updatedBy = user;
      entity.updated_by = user?.id || null;
    }

    const diff: Record<string, any> = {};
    if (event.updatedColumns?.length) {
      for (const col of event.updatedColumns) {
        diff[col.propertyName] = {
          old: (event.databaseEntity as any)?.[col.propertyName],
          new: (event.entity as any)?.[col.propertyName],
        };
      }
    }

    setImmediate(async () => {
      try {
        const log = new AuditLog();
        log.user_id = user?.id || null;
        log.action = "UPDATE";
        log.entity_name = event.metadata.name;
        log.entity_id = (entity as any)?.id || null;
        log.details = Object.keys(diff).length ? diff : null;

        await event.manager.connection.getRepository(AuditLog).save(log);
      } catch (err) {
        console.error("AuditSubscriber beforeUpdate error:", err);
      }
    });
  }

  async beforeRemove(event: RemoveEvent<any>) {
    if (event.metadata?.name === "AuditLog") return;

    setImmediate(async () => {
      try {
        const log = new AuditLog();
        log.action = "DELETE";
        log.entity_name = event.metadata?.name || null;
        log.entity_id = (event.entity as any)?.id || null;
        log.details = event.entity || null;

        await event.manager.connection.getRepository(AuditLog).save(log);
      } catch (err) {
        console.error("AuditSubscriber beforeRemove error:", err);
      }
    });
  }
}
