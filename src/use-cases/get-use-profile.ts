import { UsersRepository } from "@/repositories/prisma/users-repository";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { resourceNotFoundError } from "./erros/resource-not-found-error";

interface getUserProfileUseCaseRequest{
    userId:string
}

interface getUserProfileUseCaseResponse {
    user:User
}


export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute ({
        userId,
    }:getUserProfileUseCaseRequest):Promise<getUserProfileUseCaseResponse>{
        const user = await this.usersRepository.findbyid(userId)

        if(!user){
            throw new resourceNotFoundError()
        }

        return {
            user,
        }
    }
}