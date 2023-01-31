// src/specs/routes/web-api/users-routes.spec.ts
import * as chai from 'chai'
import { assertsResponseSchemaPresenceHook, server } from "../../lib/fastify"
import { AppDataSource } from '../../lib/typeorm'
import { DataSource } from 'typeorm'
import { User } from "../../entities/user"
import * as chaiAsPromised from 'chai-as-promised'
import fastify from 'fastify'


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
            const response = await server.inject(
                {
                    url: `/web-api/users`,
                    method: 'POST',
                    payload: {
                        "firstName": "Aimen-Allah",
                        "lastName": "FTAITI",
                        "email": "aimenftaiti@gmail.fr",
                        "password": "Motgsrdhsryhqe+-=to28*?",
                        "passwordConfirmation": "Motgsrdhsryhqe+-=to28*?"
                    }
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
    })
})