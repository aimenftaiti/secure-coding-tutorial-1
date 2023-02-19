// src/specs/routes/web-api/users-routes.spec.ts
import * as chai from 'chai'
import { assertsResponseSchemaPresenceHook, server } from "../../lib/fastify"
import { AppDataSource, getInitializedAppDataSource } from '../../lib/typeorm'
import { DataSource } from 'typeorm'
import { User } from "../../entities/user"
import * as chaiAsPromised from 'chai-as-promised'
import fastify, { RouteOptions } from 'fastify'
import { assertsSchemaBodyParamsQueryPresenceHook, MissingValidationElementsError } from '../../errors/MissingValidationElementsError'
import { CreateUserRequestBody } from '../../schemas/types/user.create.request.body'
import * as UserRequestBodySchema from '../../schemas/json/user.create.request.body.json'
import { Session } from '../../entities/session'
import { buildUserFixture } from '../fixtures/users-fixtures'
import { sign } from '@fastify/cookie'
import { buildSessionFixture } from '../fixtures/sessions-fixtures'

chai.use(chaiAsPromised)

describe('/web-api/users', function () {
    describe('POST #create', function () {
        let dataSource: DataSource;
        let user: User;
        let session: Session;

        before(async function () {
            dataSource = await getInitializedAppDataSource();
        })

        beforeEach(async function () {
            await dataSource.getRepository(Session).delete({})
            await dataSource.getRepository(User).delete({})
            user = buildUserFixture()
            session = buildSessionFixture()
            await dataSource.getRepository(User).save(user)

        })

        it('should reject with 404 if email not found', async function () {
            const sessionObject = new Session()
            user.email = ''
            sessionObject.user = user
            const response = await server.inject({
                url: '/sessions',
                method: 'POST',
                payload: {
                    email: user.email,
                    password: user.passwordHash,
                },
            })
            chai.expect(response.statusCode).to.equal(404)
        })
        it('should reject with 404 if password does not match', async function () {
            const sessionObject = new Session()
            user.passwordHash = 'wrongpassword'
            sessionObject.user = user
            const response = await server.inject({
                url: '/sessions',
                method: 'POST',
                payload: {
                    email: user.email,
                    password: user.passwordHash,
                },
            })
            chai.expect(response.statusCode).to.equal(404)
        })

        /*it('should respond with the current user identity', async function () {
            const response = await server.inject({
                url: '/users/me',
                method: 'GET',
                cookies: {
                    ['session']: sign(
                        session.token,
                        process.env.COOKIE_SECRET ? process.env.COOKIE_SECRET : 'my-secret'
                    ),
                },
            })

            chai.expect(response.statusCode).to.equal(200)
            const user = JSON.parse(response.payload) as User
            chai.expect(user.id).to.equal(user.id)
            chai.expect(response.json()).to.not.haveOwnProperty('token')
        })

        it('should respond with 401 if user is not logged in')
        it('should respond with 401 if unsigned cookie')
        it('should respond with 401 if cookie signature with a wrong key')
        it('should respond with 401 if session has expired')
        it('should respond with 401 if session has been revoked')*/
    })
})