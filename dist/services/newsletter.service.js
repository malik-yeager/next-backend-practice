"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const data_source_1 = require("../config/data-source");
const Subscriber_1 = require("../entities/Subscriber");
const subscriberRepo = data_source_1.AppDataSource.getRepository(Subscriber_1.Subscriber);
const subscribe = async (email) => {
    if (!email)
        throw new Error("Email is required");
    const existing = await subscriberRepo.findOne({ where: { email } });
    if (existing) {
        if (!existing.is_active) {
            existing.is_active = true;
            return subscriberRepo.save(existing);
        }
        throw new Error("Email already subscribed");
    }
    const subscriber = subscriberRepo.create({ email });
    return subscriberRepo.save(subscriber);
};
exports.subscribe = subscribe;
//# sourceMappingURL=newsletter.service.js.map