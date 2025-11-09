import { expect, describe, it, beforeEach, vi ,afterEach} from "vitest";
import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { UserAlreadyCheckedInError } from "./erros/user-alread-chekedIn-error";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./erros/max-distance-error";
import { ValidadeCheckinUseCase } from "./validate-checkin";
import { resourceNotFoundError } from "./erros/resource-not-found-error";
import { LateCheckinValidationError } from "./erros/late-checkin-validation-error";


let  checkInRepository:inMemoryCheckInRepository
let  sut: ValidadeCheckinUseCase


describe('CheckIn Use Case', ()=>{
    beforeEach(async ()=>{
        checkInRepository = new inMemoryCheckInRepository()
        sut = new ValidadeCheckinUseCase(checkInRepository)
        vi.useFakeTimers()


    })

    afterEach(()=>{
        //vi.useRealTimers()
    })


    it('should be able validate the  check-in ', async ()=>{

        const CreatedCheckIn = await checkInRepository.create({
            gym_id:'gym-01',
            user_id:'user-01'
        })



        const {checkIn} = await sut.execute({
            checkInId: CreatedCheckIn.id,
        })
        
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    
    })

    it('should not be able to validade an inexistent check-in',async ()=>{
        await expect(
            ()=>sut.execute({checkInId:'Inexistinten-checkIn-id',}),
        ).rejects.toBeInstanceOf(resourceNotFoundError)
    })


    it('should not be able to validate check-in  after 20 minutes of its creation ',async ()=>{
        vi.setSystemTime(new Date(2025,10,9,18,30))

        const createdCheckIn = await checkInRepository.create({
            gym_id:'gym-01',
            user_id:'user-01'
        })

        const twentyOneMinutesInMs = 1000*60*21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect (()=>
            sut.execute({
                checkInId: createdCheckIn.id,
            }),
        ).rejects.toBeInstanceOf(LateCheckinValidationError)
    })
})