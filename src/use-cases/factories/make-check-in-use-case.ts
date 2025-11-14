import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositorys"
import { CheckinUseCase } from "../check-in"



export function makeCheckinUseCase() {
    const repository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckinUseCase(repository,gymsRepository)

return useCase
}