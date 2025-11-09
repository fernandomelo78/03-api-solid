import {expect,describe, it, beforeEach} from "vitest"
import { GetUserMetricsUserCase } from "./get-user-metrics";
import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";


let checkInsRepository: inMemoryCheckInRepository
let sut:GetUserMetricsUserCase

describe('Get User Metrics Use Case',()=>{
    beforeEach(async ()=>{
        checkInsRepository = new inMemoryCheckInRepository()
        sut = new GetUserMetricsUserCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async ()=>{

            await checkInsRepository.create({
                gym_id:'gym-01',
                user_id:'user-01',
            })

            await checkInsRepository.create({
                gym_id:'gym-02',
                user_id:'user-01',
            })

            const {checkInsCount} = await sut.execute({
                userId: 'user-01',
            })
            console.log('checkInsCount:>' + checkInsCount)
            expect(checkInsCount).toEqual(2)


    })

})
