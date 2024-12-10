import {expect, describe, test, it, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlrealdyExistsErros } from './erros/user-already-exists-error'


// const usersRepository = new inMemoryUsersRepository()
// const registerUseCase = new RegisterUseCase(usersRepository)

let usersRepository:inMemoryUsersRepository
let sut:RegisterUseCase

describe('Register Use Case',()=>{
    beforeEach(()=>{
        usersRepository = new inMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('Deve poder cadastrar  o usuário'),async()=>{

        const {user} = await sut.execute({
            name:'Jon Doe',
            email:'johndow@example.com',
            password:'123456',
        })

        expect(user.id).toEqual(expect.any(String))    }


    it('Deve registrar o password em hash',async ()=> {
        const { user } =  await sut.execute({
        name:'Cadastro01',
        email:'email2@gmail.com',
        password:'123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456',user.password_hash)

   expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Não posso ter email duplicado',async ()=> {
        const email ='jondoe@example.com'
        await sut.execute({
        name:'Cadastro01',
        email,
        password:'123456',           
    })

   await expect(()=>
         sut.execute({
            name:'Cadastro01',
            email,
            password:'123456',
        }),
    ).rejects.toBeInstanceOf(UserAlrealdyExistsErros)
})

})

