import { FastifyReply, FastifyRequest } from 'fastify'
import { Session } from '../entities/session'
import { User } from '../entities/user'
import { getInitializedAppDataSource } from './typeorm'

declare module 'fastify' {
    interface FastifyRequest {
        session?: Session | null
        user?: User | null
    }
}

export async function saveSession(reply: FastifyReply, user: User) {
    const datasource = await getInitializedAppDataSource()

    const session = new Session();
    session.user = user;

    await datasource.getRepository(Session).save(session)

    await reply.setCookie('session', session.token, {
        path: '/',
        signed: true,
        httpOnly: true,
    }).status(201).send('')
}

export async function loadSession(request: FastifyRequest) {
    // TODO: read the cookie from request.cookies[COOKIE_NAME].
    const cookies = request.cookies['session'];
    if (!cookies) {
        request.session = null;
        request.user = null;
        throw new Error('No cookies');
    }
    // TODO: unsign the cookie (or reject if invalid) and retreive the token.
    const unsignResult = request.unsignCookie(cookies);
    if (!unsignResult.valid || !unsignResult.value) {
        throw new Error('Invalid token');
    }
    const token = unsignResult.value;
    // TODO: load the sesion + user and assign it to ̀request.session` and `request.user`.
    const datasource = await getInitializedAppDataSource()
    const session = await datasource
        .getRepository(Session)
        .findOne({ where: { token }, relations: { user: true } })

    if (!session) {
        request.session = null;
        request.user = null;
        throw new Error('No session');
    }
    if (session.expiredAt < new Date()) {
        request.session = null;
        request.user = null;
        throw new Error('Expired session');
    }
    if (session.revokedAt) {
        request.session = null;
        request.user = null;
        throw new Error('Revoked session');
    }
    request.session = session;
    request.user = session.user;
}