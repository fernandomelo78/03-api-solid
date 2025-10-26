import { FastifyInstance } from 'fastify'
import { register_ } from './controller/register_'
import { authenticate } from './controller/authenticate'


export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register_)
 // app.post('/sessions',authenticate)
}
