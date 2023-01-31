import fastify, { RouteOptions } from 'fastify'
import { userRoutes } from '../routes/users.routes'
import { assertsSchemaBodyParamsQueryPresenceHook } from '../errors/MissingValidationElementsError'

export const server = fastify({
    ajv: {
        customOptions: {
            removeAdditional: false,
        },
    },
})
    //.addHook('onRoute', assertsResponseSchemaPresenceHook)
    .addHook('onRoute', assertsSchemaBodyParamsQueryPresenceHook)
    .register(userRoutes, { prefix: '/web-api/users' })

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema?.response) {
        throw new Error('The response schema for the route is not present. Please provide it.')
    }
}