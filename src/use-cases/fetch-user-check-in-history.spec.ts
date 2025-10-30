import { expect, describe, it, beforeEach, vi ,afterEach} from "vitest";
import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { UserAlreadyCheckedInError } from "./erros/user-alread-chekedIn-error";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./erros/max-distance-error";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-in-history";


let  checkInRepository:inMemoryCheckInRepository
let  sut: FetchUserCheckInsHistoryUseCase


describe('CheckIn Use Case', async ()=>{
    beforeEach(async ()=>{
        checkInRepository = new inMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
    })



    it('should be able check-in ', async ()=>{

        await checkInRepository.create({
            gym_id:'gym-01',
            user_id:'user-01',
        })

       await checkInRepository.create({
            gym_id:'gym-02',
            user_id:'user-01',
        })

        const {checkIns} = await sut.execute({
            userId:'user-01'
        })

        expect(checkIns).toHaveLength(2)
    
    })

   


})