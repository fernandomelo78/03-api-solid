import { expect, describe, it, beforeEach, vi ,afterEach} from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-in-history";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { FetchNearbyGymUseCase } from "./fetch-nearby-gym";


let  gymsRepository:InMemoryGymsRepository
let  sut: FetchNearbyGymUseCase


describe('Fetch Nearby Gym Use Case', async ()=>{
    beforeEach(async ()=>{
        gymsRepository = new InMemoryGymsRepository
        sut = new FetchNearbyGymUseCase(gymsRepository)
    })



    it('should be able to fetch nearby gyms ', async ()=>{

        await gymsRepository.create({
               title: 'Near Gym',
               description: null,
               phone: '1234567890',
               latitude: -27.2092052,
               longitude: -49.6401091,
        })

       await gymsRepository.create({
               title: 'Far Gym',
               description: null,
               phone: '1234567890',
               latitude: -27.0610928,
               longitude: -49.5229501,
        })

        const {gyms} = await sut.execute({
            userLatitude:-27.2092052,
            userLongitude:-49.6401091
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:'Near Gym'}),

        ])
    
    })

    
})