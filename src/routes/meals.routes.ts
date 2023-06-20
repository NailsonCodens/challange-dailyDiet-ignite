import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod';
import {knex} from '../database';

const mealsRoute = async (app: FastifyInstance) => {
  app.post('/', async(request: FastifyRequest, reply:FastifyReply) => {
    
    const requestBodyMeal = z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      date: z.string().transform(str => new Date(str)),
      hour: z.string().refine((value) => /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(value), 'O formato precisa ser de horas ex: 14:00')
    });  

    requestBodyMeal.parse(request.body);

    await knex.insert({
      
    })


    return reply.status(201).send();
  });
}

export {mealsRoute}