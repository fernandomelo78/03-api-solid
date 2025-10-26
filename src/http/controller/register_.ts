import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { UserAlrealdyExistsErros } from '../../use-cases/erros/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register_(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)


  try{

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
        name,
        email,
        password
    })
  }catch (err){

    if(err instanceof UserAlrealdyExistsErros) {
      return reply.status(409).send({message:err.message})
    }


    throw err
    
  }

  reply.status(200).send('User created')
}
