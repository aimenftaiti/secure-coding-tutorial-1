import { RouteOptions } from "fastify"

export class MissingValidationElementsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MissingValidationElementsError'
    }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function assertsSchemaBodyParamsQueryPresenceHook(routeOptions: RouteOptions) {
    let missingSchemas = "";
    if (!routeOptions.schema)
        throw new MissingValidationElementsError('The schema for the route is not present. Please provide it.')
    if (!routeOptions.schema?.body)
        missingSchemas = missingSchemas + ' body '
    if (!routeOptions.schema?.querystring)
        missingSchemas = missingSchemas + ' querystring '
    if (!routeOptions.schema?.params)
        missingSchemas = missingSchemas + ' params '
    if (missingSchemas.length > 0)
        throw new MissingValidationElementsError(`A ${missingSchemas} validation schema is required for the route ${routeOptions.url}`)
}