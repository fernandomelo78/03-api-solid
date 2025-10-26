
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Checkin, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface CheckinUseCaseRequest{
    userId: string
    gymId:string
}

interface  CheckinUseCaseResponse {
    checkIn:Checkin
}



export class CheckinUseCase {
    constructor(
        private checkInRepository: CheckInsRepository) {}


    async execute({
        userId,
        gymId,
    }: CheckinUseCaseRequest) : Promise<CheckinUseCaseResponse>{

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )

        if(checkInOnSameDay) {
            throw new Error()
        }
        
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

          return {
            checkIn,
        }

    }

}