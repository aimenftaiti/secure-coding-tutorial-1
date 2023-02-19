import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { User } from "./user"
import { UniqueInColumn } from "../decorators/uniqueColumn.decorator"
import { IsNotEmpty } from "class-validator"
import * as crypto from 'crypto'

@Entity()
@Unique(['token'])
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
    @IsNotEmpty({ message: "Session cannot be created without a user id" })
    user!: User

    @Column({ length: 384 })
    @UniqueInColumn({ message: 'Session.token is not unique' })
    token!: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date

    @Column()
    expiredAt!: Date

    @Column({ nullable: true })
    revokedAt?: Date

    @BeforeInsert()
    init() {
        this.token = crypto.randomBytes(48).toString('base64')
        this.expiredAt = new Date()
        this.expiredAt.setDate(this.expiredAt.getDate() + 1)
    }
}