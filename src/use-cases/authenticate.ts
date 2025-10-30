
import { UsersRepository } from "@/repositories/users-repository";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUserCaseRequest{
    email: string
    password:string
}

interface  AuthenticateUseCaseResponse {
    user:User
}



export class AuthenticateUseCase {
    constructor(
        private usersRepository: UsersRepository) {}


    async execute({
        email,
        password,
    }: AuthenticateUserCaseRequest) : Promise<AuthenticateUseCaseResponse>{

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new invalidCredencialsError()
        }

        const doesNotPasswordMatch = await  compare(password, user.password_hash)

        if(!doesNotPasswordMatch){
            throw new invalidCredencialsError()
        }

        return {
            user,
        }

    }

}