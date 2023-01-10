import { UniqueInColumnConstraint } from '../constraints/uniqueInColumn.constraint';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function UniqueInColumn(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: UniqueInColumnConstraint
        });
    }
}