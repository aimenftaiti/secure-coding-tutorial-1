import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../entities/user";
import { getInitializedAppDataSource } from "../lib/typeorm";

@ValidatorConstraint({ async: true })
export class UniqueInColumnConstraint implements ValidatorConstraintInterface {
    async validate(value: string) {
        return (await getInitializedAppDataSource()).getRepository(User).findOneBy({ email: value }).then((user: User | null) => {
            return user ? false : true;
        })
    }
}