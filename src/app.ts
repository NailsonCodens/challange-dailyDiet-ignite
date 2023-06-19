import {fastify} from 'fastify';
import {userRoute} from './routes/users.routes'
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie)

app.register(userRoute, {
  prefix: 'users'
});

export {app};