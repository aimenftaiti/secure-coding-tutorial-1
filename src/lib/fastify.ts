import fastify, { RouteOptions } from 'fastify'
import { userRoutes } from '../routes/users.routes'
import { MissingValidationElementsError } from '../errors/MissingValidationElementsError'

export const server = fastify({
    ajv: {
        customOptions: {
            removeAdditional: false,
        },
    },
})
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .addHook('onRoute', assertsSchemaBodyParamsQueryPresenceHook)
    .register(userRoutes, { prefix: '/web-api/users' })

export function assertsSchemaBodyParamsQueryPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema)
        throw new MissingValidationElementsError('The schema for the route is not present. Please provide it.')
    if (!routeOptions.schema?.body)
        throw new MissingValidationElementsError('The body schema for the route is not present. Please provide it.')
    if (!routeOptions.schema?.querystring)
        throw new MissingValidationElementsError('The querystring schema for the route is not present. Please provide it.')
    if (!routeOptions.schema?.params)
        throw new MissingValidationElementsError('The params schema for the route is not present. Please provide it.')
}

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema?.response) {
        throw new Error('The response schema for the route is not present. Please provide it.')
    }
}