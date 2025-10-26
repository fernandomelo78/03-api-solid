import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe,it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { invalidCredencialsError } from "./erros/invalid-credentials-error";
import { RegisterUseCase } from "./register_";

// const usersRepository = new inMemoryUsersRepository()
// const sut = new AuthenticateUseCase(usersRepository)

let usersRepository : inMemoryUsersRepository
let sut : AuthenticateUseCase

describe('Autenticação do Usuario',()=>{
    beforeEach(()=>{
            usersRepository = new inMemoryUsersRepository()
            sut = new AuthenticateUseCase(usersRepository)
    })
    
    it ('Deve ser possível realizar a autenticação', async ()=>{


    await usersRepository.create({
        name:'John Doe',
        email:'johndoe@example.com',
        password_hash: await hash('123456',6),
    })

    const { user } = await sut.execute({
        email:'johndoe@example.com',
        password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
})


it('Não deve ser possível autenticar com  e-mail errado', async ()=>{
    usersRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
    expect(()=>sut.execute({email:'johndoe@example.com',password:'123456',}),).rejects.toBeInstanceOf(invalidCredencialsError)
})


it('Não deve ser possível autenticar com senha errada', async ()=>{
    usersRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)

    const user = usersRepository.create({
        name:'john doe',
        email:'johndoe@example.com',
        password_hash: await hash('123456',6)
    })

   await expect(()=>
        sut.execute({
            email:'johndoe@example.com',
            password:'123123',
        }),).rejects.toBeInstanceOf(invalidCredencialsError)
    
})

})





