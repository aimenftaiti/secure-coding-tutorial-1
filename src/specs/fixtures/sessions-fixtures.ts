// src/specs/fixtures/sessions-fixtures.ts
import { Session } from '../../entities/session.js'
import { buildUserFixture } from './users-fixtures.js'
import { User } from '../../entities/user.js'
import { getInitializedAppDataSource } from '../../lib/typeorm.js'

type SessionFixtureOptions = { user?: User }

export function buildSessionFixture(opts: SessionFixtureOptions = {}) {
    const session = new Session()
    session.user = opts.user ?? buildUserFixture()
    return session
}

export async function createSessionFixture(opts: SessionFixtureOptions = {}) {
    return (await getInitializedAppDataSource()).getRepository(Session).save(buildSessionFixture(opts))
}