
import  hash from 'bcryptjs'
import { UsersRepository } from "@/repositories/prisma/users-repository"
import { UserAlrealdyExistsErros } from './erros/user-already-exists-error'
import { User } from '@prisma/client'



interface RegisterUseCaseRequest {
    name: string
    email:string
    password:string  
}

interface RegisterUseCaseResponse{
    user: User
}
//Inversão de Dependencia

export class RegisterUseCase {
constructor(private usersRepository:UsersRepository){}

async  execute({name,email,password,}:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
            
            const password_hash = await hash.hash(password, 6)
                           
            const userWithSameEmail   = await this.usersRepository.findByEmail(email) 
            if(userWithSameEmail){
                throw new UserAlrealdyExistsErros()
             }
       

            const user = await this.usersRepository.create({
                name,
                email,
                password_hash,
            })

            return {
                user,
            }
        }
}






