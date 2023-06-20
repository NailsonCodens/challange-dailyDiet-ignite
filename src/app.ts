import {fastify} from 'fastify';
import {userRoute} from './routes/users.routes'
import cookie from '@fastify/cookie';
import { mealsRoute } from './routes/meals.routes';

const app = fastify();

app.register(cookie)

app.register(mealsRoute, {
  prefix: 'meals',
});

app.register(userRoute, {
  prefix: 'users'
});

export {app};