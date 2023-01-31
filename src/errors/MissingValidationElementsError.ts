export class MissingValidationElementsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MissingValidationElementsError'
    }
}