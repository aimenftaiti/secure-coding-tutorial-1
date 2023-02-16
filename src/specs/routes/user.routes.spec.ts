// src/specs/routes/web-api/users-routes.spec.ts
import * as chai from 'chai'
import { assertsResponseSchemaPresenceHook, server } from "../../lib/fastify"
import { AppDataSource } from '../../lib/typeorm'
import { DataSource } from 'typeorm'
import { User } from "../../entities/user"
import * as chaiAsPromised from 'chai-as-promised'
import fastify, { RouteOptions } from 'fastify'
import { assertsSchemaBodyParamsQueryPresenceHook, MissingValidationElementsError } from '../../errors/MissingValidationElementsError'
import { CreateUserRequestBody } from '../../schemas/types/user.create.request.body'
import * as UserRequestBodySchema from '../../schemas/json/user.create.request.body.json'


chai.use(chaiAsPromised)

describe('/web-api/users', function () {
    describe('POST #create', function () {
        let dataSource: DataSource;

        before(async function () {
            dataSource = await AppDataSource().initialize();
        })

        beforeEach(async function () {
            await dataSource.getRepository(User).clear()

        })

        it('should register the user', async function () {
            const payload: CreateUserRequestBody = {

                "firstName": "Aimen-Allah",
                "lastName": "FTAITI",
                "email": "aimenftaiti@gmail.fr",
                "password": "Motgsrdhsryhqe+-=to28*?",
                "passwordConfirmation": "Motgsrdhsryhqe+-=to28*?"
            }
            const response = await server.inject(
                {
                    url: `/web-api/users`,
                    method: 'POST',
                    payload: payload,
                }
            )
            chai.expect(response.statusCode).equal(201);
            chai.expect(response.json()).to.have.property('id');
            chai.expect(response.json()).to.have.property('firstName');
            chai.expect(response.json()).to.have.property('lastName');
            chai.expect(response.json()).to.have.property('email');
        })

        it("should validate that the hook throws when an unsafe route is registered", function () {
            const fastisyTestServer = fastify().addHook('onRoute', assertsResponseSchemaPresenceHook)
            chai.expect(() => {
                fastisyTestServer.route({
                    method: 'GET',
                    url: '/test',
                    handler: () => ({})
                })
            }).to.throw()
        })

        it('should throw an error if the validation schema is missing', async () => {
            const routeOptions: RouteOptions = { url: '/test', method: 'GET', handler: () => ({}) }
            await chai.expect(
                assertsSchemaBodyParamsQueryPresenceHook(routeOptions)
            ).to.be.rejectedWith(MissingValidationElementsError)
        })

        // here, it throw a 404 because the route GET is not implemented
        // but the test is "designed" to throw a 400 when requesting by unexisting id
        it('show throw a 404 when requesting by unexisting id', async function () {
            const response = await server.inject({
                method: 'GET',
                url: '/users/random-id',
            })
            chai.expect(response.statusCode).to.equal(404)
        })

        it('should throw Validation Error when required fields are missing', async function () {
            const userBody = {
                "firstName": "Aimen-Allah",
                "lastName": "FTAITI",
                "email": "aimenftaiti1@gmail.fr",
                "password": null,
                "passwordConfirmation": null,
            }
            const response = await server.inject({
                url: '/web-api/users',
                method: 'POST',
                payload: { userBody },
            })
            chai.expect(response.statusCode).equal(400)
        })
    })
})