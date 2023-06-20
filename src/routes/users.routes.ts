import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod';
import {knex} from '../database'
import {randomUUID} from 'node:crypto'


const userRoute = async (app: FastifyInstance) => {
  app.post('/',async (request: FastifyRequest, reply: FastifyReply) => {
    const requestBodyUser = z.object({
      name: z.string(),
      user: z.string(),
      password: z.string()
    })

    const {name, password, user} =  requestBodyUser.parse(request.body);

    const id = randomUUID();  

    reply.cookie('userId', id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7 //7days
    })

    await knex('users').insert({
      id: id,
      name,
      user,
      password
    });

    return reply.status(201).send();
  })
}

export {userRoute};