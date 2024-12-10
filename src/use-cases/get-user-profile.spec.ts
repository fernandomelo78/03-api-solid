import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-use-profile";
import { hash } from "bcryptjs";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { resourceNotFoundError } from "./erros/resource-not-found-error";

let usersRepository:inMemoryUsersRepository
let sut:GetUserProfileUseCase

describe('Pegando o perfil do usuário',()=>{
    beforeEach(()=>{
        usersRepository = new inMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })



it('Deve ser possível pegar o perfil do usuário', async ()=>{
   const createdUser = await usersRepository.create({
        name:'John Doe',
        email: 'johndoe@example.com',
        password_hash:await hash('123456',6),
    })

    const {user} = await sut.execute({
        userId : createdUser.id,
    })

    expect(user.name).toEqual('John Doe')

})

// it('Não deve ser possível pegar o profile do usuário', async ()=> {
//     expect(()=> 
//         sut.execute({
//             userId:'non-existing-id'
//         }),
//     ).rejects.toBeInstanceOf(resourceNotFoundError)
// })


})






