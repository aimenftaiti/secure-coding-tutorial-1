import { FastifyInstance } from "fastify"
import { CreateSessionRequestBody } from "../schemas/types/session.create.request.body"
import * as SessionRequestBodySchema from '../schemas/json/user.create.request.body.json'
import { getInitializedAppDataSource } from "../lib/typeorm"
import { User } from "../entities/user"
import { Session } from "../entities/session"
import { saveSession } from "../lib/session"


// eslint-disable-next-line @typescript-eslint/require-await
export async function sessionRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateSessionRequestBody }>('', {
        schema: {
            params: {},
            querystring: {},
            body: SessionRequestBodySchema,
        },
        handler: async function (request, reply) {
            const datasource = await getInitializedAppDataSource()
            const user = await datasource
                .getRepository(User)
                .findOneBy({ email: request.body.email })
            if (!user) throw new Error('User could not be found')

            void saveSession(reply, user)
        }
    })
}