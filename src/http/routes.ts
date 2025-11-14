import { FastifyInstance } from "fastify";
import { register } from "./controller/register";
import { profile } from "./controller/profile";

export async function appRoutes(app:FastifyInstance){

    app.post('/users', register)

    app.get('/me',profile)


}