
import { UsersRepository } from "@/repositories/users-repository";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Checkin, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UserAlreadyCheckedInError } from "./erros/user-alread-chekedIn-error";
import { GymsRepository } from "@/repositories/gyms-repository";
import { resourceNotFoundError } from "./erros/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordenates";
import { MaxDistanceError } from "./erros/max-distance-error";

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
        userLatitude,
        userLongitude,
    }: CheckinUseCaseRequest) : Promise<CheckinUseCaseResponse>{

        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new resourceNotFoundError()
        }

        //calculate distance between user and gym
        const distance = getDistanceBetweenCoordinates(
        {latitude: userLatitude, longitude: userLongitude},
        {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}, )
 
        const max_distance_permited_in_kilometer = 0.1
 
        if(distance > max_distance_permited_in_kilometer){
            throw new MaxDistanceError()
        }
        
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