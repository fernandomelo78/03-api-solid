import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-in-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositorys"



export function makeFetchUserCheckiInsHistoryUseCase() {
    const repository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(repository)

return useCase
}