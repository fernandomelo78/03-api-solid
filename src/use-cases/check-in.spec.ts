import { expect, describe, it, beforeEach, vi ,afterEach} from "vitest";
import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { UserAlreadyCheckedInError } from "./erros/user-alread-chekedIn-error";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";


let  checkInRepository:inMemoryCheckInRepository
let gymRepository: InMemoryGymsRepository
let  sut: CheckinUseCase


describe('CheckIn Use Case', ()=>{
    beforeEach(async ()=>{
        checkInRepository = new inMemoryCheckInRepository()
        gymRepository = new InMemoryGymsRepository()
        sut = new CheckinUseCase(checkInRepository,gymRepository)
        vi.useFakeTimers()

       await  gymRepository.create({
            id:'gym-01',
            title:'Academia Titulo',
            description:'',
            phone:'',
            latitude:-27.5962086,
            longitude:-48.6243741,
        })
    })

    afterEach(()=>{
        vi.useRealTimers()
    })


    it('should be able check-in ', async ()=>{

        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude:-27.5962086,
            userLongitude:-48.6243741
        })
        
        //console.log(checkIn.create_at)
        expect(checkIn.gym_id).toEqual(expect.any(String))
    
    })

    it('should not be able to check in twice in the same day', async ()=>{
         vi.setSystemTime(new Date(2025,10,26,8,0,0)) //Usa o recurso do viTeste pra simular uma data fake
       
        await sut.execute ({
            gymId:'gym-01',
            userId: 'user-01',
            userLatitude:-27.5962086,
            userLongitude:-48.6243741
        })

        
        await expect(()=>
                sut.execute ({
                    gymId:'gym-01',
                    userId: 'user-01',
                    userLatitude:-27.5962086,
                    userLongitude:-48.6243741
                }),
            ).rejects.toBeInstanceOf(UserAlreadyCheckedInError)      
    })

    it('should not be able to check in twice but in diferent  day', async ()=>{
         vi.setSystemTime(new Date(2025,10,26,8,0,0)) //Usa o recurso do viTeste pra simular uma data fake
       
        await sut.execute ({
            gymId:'gym-01',
            userId: 'user-01',
            userLatitude:-27.5962086,
            userLongitude:-48.6243741

        })

         vi.setSystemTime(new Date(2025,10,27,8,0,0)) //Usa o recurso do viTeste pra simular uma data fake
        
        const {checkIn} = await sut.execute ({
            gymId:'gym-01',
            userId: 'user-01',
            userLatitude:-27.5962086,
            userLongitude:-48.6243741

        })

        expect(checkIn.id).toEqual(expect.any(String)) 

           
    })
    
    it('should not be able to check-in on distant gym', async ()=>{     


        await expect(()=>
             sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude:-27.8962086,
                userLongitude:-48.8243741
            }),
        ).rejects.toBeInstanceOf(Error)   
    })


})