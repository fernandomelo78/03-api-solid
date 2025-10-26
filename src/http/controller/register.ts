import { FastifyRequest,FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { UserAlreadyExistsErros } from '@/use-cases/erros/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request:FastifyRequest,reply:FastifyReply){
    const registerBodySchema = z.object({       
        name:z.string(),
        email:z.string().email(),
        password:z.string().min(6),
    })

    const {name,email,password}  = registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase() 


    try {
        await registerUseCase.execute({
         name,
         email,
         password
        })

    } catch (err) {
        if (err instanceof UserAlreadyExistsErros){
            return reply.status(409).send({message: err.message})
        }


        throw err
    }



    return reply.status(201).send()
}