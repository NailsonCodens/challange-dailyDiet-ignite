import {fastify} from 'fastify';
import {userRoute} from './routes/users.routes'

const app = fastify();

app.register(userRoute, {
  prefix: 'users'
});

export {app};