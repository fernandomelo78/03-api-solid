import { makeValidateCheckiInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function validate(request:FastifyRequest, reply:FastifyReply){

    const validadeCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const {checkInId} = validadeCheckInParamsSchema.parse(request.params)

    const validadeCheckInUseCase = makeValidateCheckiInUseCase()

    await  validadeCheckInUseCase.execute({
        checkInId,
    })

    return reply.status(204).send()  

}