
import { Checkin, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { resourceNotFoundError } from "./erros/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./erros/late-checkin-validation-error";

interface ValidadeCheckinUseCaseRequest{
    checkInId: string
}

interface  ValidadeCheckinUseCaseResponse {
    checkIn:Checkin
}



export class ValidadeCheckinUseCase {
    constructor(private checkInRepository: CheckInsRepository) {}


    async execute({
        checkInId,
    }: ValidadeCheckinUseCaseRequest) : Promise<ValidadeCheckinUseCaseResponse>{

        const checkIn = await this.checkInRepository.findById(checkInId)


      
        if(!checkIn){
            throw new resourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.create_at,
            'minutes',
        )

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckinValidationError()
        }

        checkIn.validated_at = new Date()
           
        await this.checkInRepository.save(checkIn)
        
        return {checkIn}

    }

}