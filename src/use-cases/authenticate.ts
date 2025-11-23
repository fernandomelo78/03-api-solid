
import { UsersRepository } from "@/repositories/users-repository";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

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
      
          console.log('user: ' + JSON.stringify(user))
        if(!user){
            throw new invalidCredencialsError()
        }

        const doesNotPasswordMatch = await  bcrypt.compare(password, user.password_hash)
        if(!doesNotPasswordMatch){
            throw new invalidCredencialsError()
        }

        return {
            user,
        }

    }

}