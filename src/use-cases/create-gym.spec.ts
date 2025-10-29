import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { beforeEach, describe, expect, it } from "vitest";


let gymsRepository : InMemoryGymsRepository
let sut :  CreateGymUseCase

describe('Create Gym Use Case', () => {


        beforeEach(() => {
         gymsRepository = new InMemoryGymsRepository()
         sut = new CreateGymUseCase(gymsRepository)
       })

    
       
       it('should be able to Create a Gym', async () => {
           
           const {gym}= await sut.execute({
               title: 'JavaScript Gym',
               description: null,
               phone: '1234567890',
               latitude: -27.5962086,
               longitude: -48.6243741,
            })
            
            expect(gym.id).toEqual(expect.any(String))
            
        })
    })