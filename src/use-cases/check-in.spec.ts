import { expect, describe, it, beforeEach, vi ,afterEach} from "vitest";
import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { UserAlreadyCheckedInError } from "./erros/user-alread-chekedIn-error";


let  checkInRepository:inMemoryCheckInRepository
let  sut: CheckinUseCase


describe('CheckIn Use Case',()=>{
    beforeEach(()=>{
        checkInRepository = new inMemoryCheckInRepository()
        sut = new CheckinUseCase(checkInRepository)
        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })


    it('should be able check-in ', async ()=>{
       

        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })
        
        console.log(checkIn.create_at)
        expect(checkIn.gym_id).toEqual(expect.any(String))
    
    })

    it('should not be able to check in twice in the same day', async ()=>{
         vi.setSystemTime(new Date(2025,10,26,8,0,0)) //Usa o recurso do viTeste pra simular uma data fake
       
        await sut.execute ({
            gymId:'gym-01',
            userId: 'user-01',
        })

        
        await expect(()=>
                sut.execute ({
                    gymId:'gym-01',
                    userId: 'user-01',
                }),
            ).rejects.toBeInstanceOf(UserAlreadyCheckedInError)

    
    
    })

    


})