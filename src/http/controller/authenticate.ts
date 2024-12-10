import { FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod'
import { invalidCredencialsError } from "@/use-cases/erros/invalid-credentials-error";
import { makeAuthenticadeUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
)
{

const authenticateBodySchema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
})

const {email,password} = authenticateBodySchema.parse(request.body)


try{
    const authenticateUseCase = makeAuthenticadeUseCase()

    await authenticateUseCase.execute({
        email,
        password
    })
    
}catch (err){
    if(err instanceof invalidCredencialsError){
        return reply.status(400).send({message:err.message})
    }

}

}
