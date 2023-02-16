import fastify, { FastifyError, FastifyReply, FastifyRequest, RouteOptions } from 'fastify'
import { userRoutes } from '../routes/users.routes'
import { MissingValidationElementsError, assertsSchemaBodyParamsQueryPresenceHook } from '../errors/MissingValidationElementsError'
import { ValidationError } from 'class-validator'
import { EntityNotFoundError } from 'typeorm'

const errorHandler = (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => {
    if (process.env.NODE_ENV === 'production' && reply.statusCode >= 500)
        void reply.status(500).send({ error: 'Internal Server Error' })
    else if (reply.statusCode < 500)
        void reply.send(error)
    else
        void reply.status(500).send({ error: error.message })

    if (error instanceof ValidationError)
        void reply.status(400).send({ error: error.constraints })
    if (error instanceof EntityNotFoundError)
        void reply.status(404).send({ error: error.message })
    if (error instanceof MissingValidationElementsError)
        void reply.status(400).send({ error: error.message })
}

export const server = fastify({
    ajv: {
        customOptions: {
            removeAdditional: false,
        },
    },
})
    //.addHook('onRoute', assertsResponseSchemaPresenceHook)
    .setErrorHandler(errorHandler)
    .addHook('onRoute', assertsSchemaBodyParamsQueryPresenceHook)
    .register(userRoutes, { prefix: '/web-api/users' })

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema?.response) {
        throw new Error('The response schema for the route is not present. Please provide it.')
    }
}

