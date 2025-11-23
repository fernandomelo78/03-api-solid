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

    const {user} = await authenticateUseCase.execute({
        email,
        password
    })

   
  
    const token = await reply.jwtSign({
        role:user.role,
    },{
        sign:{
            sub:user.id,
        }
    })

    const refreshToken = await reply.jwtSign(
        {
           role:user.role,
        },
        {
            sign:{
                sub:user.id,
                expiresIn:'7d',
            },
        },
    )


    return reply
    .setCookie('refreshToken', refreshToken,{
        path:'/', //quais rotas da  aplicação terão acesso ao cookie,
        secure:true, //usa o https para enctriptar o cookie, não sendo possível ler no frontEnd
        sameSite:true, //somente o dominio tera acesso
        httpOnly:true, //somente o backEnd poderá acessar, ficara disponível somente na requisição, não fica salvo no navegador    
    })
    .status(200)
    .send({
        token,
    })
}catch (err){
    if(err instanceof invalidCredencialsError){
        return reply.status(400).send({message:err.message})
    }else{
       return reply.status(400).send(err)

    }

}


}
