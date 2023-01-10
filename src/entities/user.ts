import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import {
    IsNotEmpty,
} from "class-validator"
import { UniqueInColumn } from "../decorators/uniqueColumn.decorator";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    firstname!: string;

    @Column()
    @IsNotEmpty()
    lastname!: string;

    @Column({
        transformer: {
            from: (value: string) => value.toLowerCase(),
            to: (value: unknown) => {
                if (typeof value === "string") return value.toLowerCase()
                else return value
            }
        }
    })
    @IsNotEmpty()
    @UniqueInColumn({ message: "Email already exists" })
    email!: string;

    @Column()
    @IsNotEmpty()
    passwordHash!: string;

    constructor(firstname: string, lastname: string, passwordHash: string, email?: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.passwordHash = passwordHash;
        if (email)
            this.email = email;
    }

    async setPassword(password: string, passwordConfirmation: string) {
        if (password !== passwordConfirmation) {
            throw new Error("Password and password confirmation do not match")
        }
        this.passwordHash = await bcrypt.hash(password, 10)
    }
}



