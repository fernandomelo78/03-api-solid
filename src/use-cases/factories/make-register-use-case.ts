import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository_"
import { RegisterUseCase } from "../register_"


export function makeRegisterUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    return registerUseCase
}