import { FetchNearbyGymUseCase } from "../fetch-nearby-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"



export function makeFetchNearbyGymsUseCase() {
    const repository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymUseCase(repository)

return useCase
}