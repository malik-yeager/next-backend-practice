import { AppDataSource } from "../config/data-source";
import { Subscriber } from "../entities/Subscriber";

const subscriberRepo = AppDataSource.getRepository(Subscriber);

export const subscribe = async (email: string) => {
    if (!email) throw new Error("Email is required");

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
