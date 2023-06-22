import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod';
import {knex} from '../database';
import { randomUUID } from "node:crypto";

const mealsRoute = async (app: FastifyInstance) => {
  app.post('/', async(request: FastifyRequest, reply:FastifyReply) => {
    
    const requestBodyMeal = z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      date: z.string().transform(str => new Date(str)),
      hour: z.string().refine((value) => /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(value), 'O formato precisa ser de horas ex: 14:00'),
      isInDiet: z.coerce.boolean()
    });  

    const {name, description, date, hour, isInDiet} = requestBodyMeal.parse(request.body);

    const inDiet = isInDiet === true ? 1 : 0

    //get cookies id user 
    //do middleware check-user-id

    await knex.insert({
      id: randomUUID(),
      user_id: /*  */,
      name,
      description,
      date,
      hour,
      inDiet
    })


    return reply.status(201).send();
  });
}

export {mealsRoute}