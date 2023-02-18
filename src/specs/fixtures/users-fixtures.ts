// src/specs/fixtures/users-fixtures.ts
import { User } from '../../entities/user.js'
import { faker } from '@faker-js/faker'
import { getInitializedAppDataSource } from '../../lib/typeorm.js'

type UserFixtureOptions = Partial<Pick<User, 'firstname' | 'lastname' | 'email'>>

export function buildUserFixture(opts: UserFixtureOptions = {}) {
    const user = new User(
        opts.firstname ?? faker.name.firstName(),
        opts.lastname ?? faker.name.lastName(),
        opts.email ?? faker.internet.email()
    )

    // that hash matches password 'changethat', hardcoded so we save CPU hasing time
    user.passwordHash = '$2a$12$dm2t30Y07Mt9TklkLOuy.efFIJ69WTW3f7NmwH8uioX9R6NHMQSXO'

    return user
}

export async function createUserFixture(opts: UserFixtureOptions = {}) {
    return (await getInitializedAppDataSource()).getRepository(User).save(buildUserFixture(opts))
}