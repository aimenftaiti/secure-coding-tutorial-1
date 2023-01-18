import fastify from 'fastify'
import { User } from '../entities/user'
import { AppDataSource } from "./typeorm";
import * as UserRequestBodySchema from '../schemas/json/user.create.request.body.json'
import { CreateUserRequestBody } from '../schemas/types/user.create.request.body'
import { CreateUserResponseBody } from '../schemas/types/user.create.response.body';

export const server = fastify()

// GET request for hello world
server.get('/', {
    handler: function (request, reply) {
        return { hello: 'world' }
    }
})

server.post<{ Body: CreateUserRequestBody }>('/web-api/users', {
    handler: async function (request, reply): Promise<CreateUserResponseBody> {
        const userBody = request.body;
        const user = new User(userBody.firstName, userBody.lastName, userBody.email);
        await user.setPassword(userBody.password, userBody.passwordConfirmation);
        await AppDataSource().getRepository(User).save(user);

        return {
            id: user.id.toString(),
            firstName: user.firstname,
            lastName: user.lastname,
            password: user.passwordHash,
            email: user.email
        }
    }
})