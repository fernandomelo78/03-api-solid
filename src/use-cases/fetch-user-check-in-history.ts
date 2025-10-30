import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";


interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
}

interface FetchUserCheckInsHistoryUseCaseRespose {
    checkIns: Checkin[]
}



export class FetchUserCheckInsHistoryUseCase {
    constructor (private checkInsRepository:CheckInsRepository){}
    
    async execute ({
        userId,
    } :FetchUserCheckInsHistoryUseCaseRequest) : Promise<FetchUserCheckInsHistoryUseCaseRespose> {
        
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return {checkIns,}
        

    }
}


