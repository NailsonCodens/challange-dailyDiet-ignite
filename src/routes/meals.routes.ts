import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod';
import {knex} from '../database';
import { randomUUID } from "node:crypto";
import { checkUserId } from "../middlewares/check-id-user-exists";
import { compareAsc } from "date-fns";
import { request } from "node:http";

const mealsRoute = async (app: FastifyInstance) => {
  app.post('/', {preHandler: [checkUserId]}, async(request: FastifyRequest, reply:FastifyReply) => {
    
    const {userId} = request.cookies

    const requestBodyMeal = z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      date: z.string().transform(str => new Date(str).toISOString()),
      hour: z.string().refine((value) => /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(value), 'O formato precisa ser de horas ex: 14:00'),
      isInDiet: z.coerce.boolean()
    });  
    
    const {name, description, date, hour, isInDiet} = requestBodyMeal.parse(request.body);
    const inDiet = isInDiet === true ? 1 : 0

    const dateMeal = new Date(date); 
    const dateNow = new Date()

    if(compareAsc(dateMeal, dateNow) == 1){
      throw new Error("Não é permitido adicionar uma refeição com data maior que o dia de hoje.");      
    }

    await knex('meals').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      date,
      hour,
      is_in_diet: inDiet
    })


    return reply.status(201).send();
  });

  app.put('/:id', {preHandler: [checkUserId]}, async(request: FastifyRequest, reply:FastifyReply) => {
    console.log('sdsad');
    
    const {userId} = request.cookies

    const requestParams = z.object({
      id: z.string().uuid()
    });

    const {id} = requestParams.parse(request.params);

    const requestBodyMeal = z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      date: z.string().transform(str => new Date(str).toISOString()),
      hour: z.string().refine((value) => /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(value), 'O formato precisa ser de horas ex: 14:00'),
      isInDiet: z.coerce.boolean()
    });  

    const {name, description, date, hour, isInDiet} = requestBodyMeal.parse(request.body);
    const inDiet = isInDiet === true ? 1 : 0

    const dateMeal = new Date(date); 
    const dateNow = new Date()

    if(compareAsc(dateMeal, dateNow) == 1){
      throw new Error("Não é permitido adicionar uma refeição com data maior que o dia de hoje.");      
    }

    const getMealById = await knex('meals').where({
      id: id,
      user_id: userId
    }).select().first();

    if(!getMealById){
      throw new Error("Não é possível alterar esta refeição, ela não existe!");
      
    }

    await knex('meals')
    .where({
      id: id,
      user_id: userId,
    })    
    .update({
      name,
      description,
      date,
      hour,
      is_in_diet: inDiet
    })

  });

  app.delete('/:id', {preHandler: [checkUserId]}, async(request: FastifyRequest, reply: FastifyReply) => {

  });
}

export {mealsRoute}