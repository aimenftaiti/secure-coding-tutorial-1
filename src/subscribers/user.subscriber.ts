import { validate } from "class-validator";
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { User } from "../entities/user";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo() {
        return User;
    }

    async validate(entity: User) {
        const errors = await validate(entity)
        if (errors.length) {
            throw errors[0]
        }
    }

    async beforeInsert(event: InsertEvent<User>) {
        await this.validate(event.entity)
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        await this.validate(event.databaseEntity)
    }
}