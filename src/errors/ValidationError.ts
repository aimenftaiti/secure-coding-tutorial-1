import { EventSubscriber } from "typeorm";
import { User } from "../entities/user";

@EventSubscriber()
export class ValidationError extends Error {

    message!: string;

    //target object
    target!: User;

    //property property
    property!: string;

    constructor(message: string, target: User, property: string) {
        super(message);
        this.name = "ValidationError";
        this.target = target;
        this.property = property;
    }
}
