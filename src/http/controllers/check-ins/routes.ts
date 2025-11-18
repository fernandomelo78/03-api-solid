import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function routesChekIns(app:FastifyInstance){
    app.addHook('onRequest',verifyJwt)
}