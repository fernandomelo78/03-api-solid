import { FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod'
import { invalidCredencialsError } from "@/use-cases/erros/invalid-credentials-error";
import { makeAuthenticadeUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { sign } from "node:crypto";

export async function refreshToken(
    request: FastifyRequest,
    reply: FastifyReply,
)
{


await request.jwtVerify({onlyCookie:true})

const {role} = request.user

    const token = await reply.jwtSign({role},{
        sign:{
            sub:request.user.sub,
        }
    })

    const refreshToken = await reply.jwtSign(
        {role},
        {
            sign:{
                sub:request.user.sub,
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

}
