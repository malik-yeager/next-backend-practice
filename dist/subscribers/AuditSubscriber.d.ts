import { EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from "typeorm";
export declare class AuditSubscriber implements EntitySubscriberInterface {
    listenTo(): ObjectConstructor;
    private isTrackable;
    beforeInsert(event: InsertEvent<any>): Promise<void>;
    beforeUpdate(event: UpdateEvent<any>): Promise<void>;
    beforeRemove(event: RemoveEvent<any>): Promise<void>;
}
//# sourceMappingURL=AuditSubscriber.d.ts.map