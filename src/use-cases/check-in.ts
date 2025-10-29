
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Checkin, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { UserAlreadyCheckedInError } from "./erros/user-alread-chekedIn-error";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";

interface CheckinUseCaseRequest{
    userId: string
    gymId:string
    userLatitude : number
    userLongitude: number
}

interface  CheckinUseCaseResponse {
    checkIn:Checkin
}



export class CheckinUseCase {
    constructor(
        private checkInRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}


    async execute({
        userId,
        gymId,
    }: CheckinUseCaseRequest) : Promise<CheckinUseCaseResponse>{

        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new Error()
        }

        //calculate distance between user and gym

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )

        if(checkInOnSameDay) {
            //console.log(checkInOnSameDay)
            throw new UserAlreadyCheckedInError()
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