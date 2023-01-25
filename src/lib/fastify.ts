import fastify from 'fastify'
import { User } from '../entities/user'
import * as UserRequestBodySchema from '../schemas/json/user.create.request.body.json'
import * as UserResponseBodySchema from '../schemas/json/user.create.response.body.json'
import { CreateUserRequestBody } from '../schemas/types/user.create.request.body'
import { CreateUserResponseBody } from '../schemas/types/user.create.response.body';
import { getInitializedAppDataSource } from './typeorm';

export const server = fastify()

server.post<{ Body: CreateUserRequestBody }>('/web-api/users', {
    schema: {
        body: UserRequestBodySchema,
        response: { 201: UserResponseBodySchema }
    },
    handler: async function (request, reply): Promise<CreateUserResponseBody> {
        const userBody = request.body;
        const user = new User(userBody.firstName, userBody.lastName, userBody.email);
        try {
            await user.setPassword(userBody.password, userBody.passwordConfirmation);
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
        }

        await (await getInitializedAppDataSource()).getRepository(User).save(user);

        console.log({
            id: user.id.toString(),
            firstName: user.firstname,
            lastName: user.lastname,
            password: user.passwordHash,
            email: user.email
        });
        return reply.status(201).send({
            id: user.id.toString(),
            firstName: user.firstname,
            lastName: user.lastname,
            password: user.passwordHash,
            email: user.email
        })
    }
})