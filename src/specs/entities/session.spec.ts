// src/specs/routes/web-api/users-routes.spec.ts
import * as chai from 'chai'
import { AppDataSource, getInitializedAppDataSource } from '../../lib/typeorm'
import { DataSource } from 'typeorm'
import * as chaiAsPromised from 'chai-as-promised'
import { Session } from '../../entities/session'
import { buildUserFixture } from '../fixtures/users-fixtures'
import { User } from '../../entities/user'
import { server } from '../../lib/fastify'

chai.use(chaiAsPromised)

describe('/web-api/sessions', function () {
    describe('validations', function () {
        let dataSource: DataSource;
        let user: User;

        before(async function () {
            dataSource = await getInitializedAppDataSource();
        })

        beforeEach(async function () {
            await dataSource.getRepository(Session).delete({})
            await dataSource.getRepository(User).delete({})
            user = buildUserFixture()
            await dataSource.getRepository(User).save(user)
        })

        after(async function () {
            await dataSource.getRepository(Session).delete({})
            await dataSource.getRepository(User).delete({})
        })

        const createSession = async (user: User) => {
            const sessionObject = new Session()
            sessionObject.user = user
            return await dataSource.getRepository(Session).save(sessionObject)
        }

        it('should create a session', async function () {
            const session = await createSession(user)

            chai.expect(session.createdAt.getDay()).to.equal(new Date().getDay())
            chai.expect(session.expiredAt.getDate()).to.equal(new Date().getDate() + 1)
            chai.expect(session.token.length).to.equal(64)
            chai.expect(session.user.firstname).to.equal(user.firstname)
        })
        it('should create a session after lowering email', async function () {
            const session = await createSession(user)

            chai.expect(session.user.email).to.equal(user.email.toLowerCase())
        })
    })
})