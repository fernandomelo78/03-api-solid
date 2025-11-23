import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
import { authenticate } from "./authenticate";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refreshToken } from "./refreshToken";

export async function usersRoutes(app:FastifyInstance){
    app.post('/users', register)
    app.post('/authenticate', authenticate)
    app.get('/me',{onRequest:[verifyJwt]},profile)
    app.patch('/token/refresh',refreshToken)


}