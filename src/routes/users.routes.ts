import { FastifyInstance, FastifyRequest } from "fastify";
import {z} from 'zod';
import {knex} from '../database'
import {randomUUID} from 'node:crypto'


const userRoute = async (app: FastifyInstance) => {
  app.post('/',async (request: FastifyRequest) => {
    const requestBodyUser = z.object({
      name: z.string(),
      user: z.string(),
      password: z.string()
    })

   const {name, password, user} =  requestBodyUser.parse(request.body);


   await knex('users').insert({
      id: randomUUID(),
      name,
      user,
      password
    });

    return;
  })
}

export {userRoute};