import {expect, describe, test, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlrealdyExistsErros } from './erros/user-already-exists-error'




describe('Register Use Case',()=>{

    it('Deve poder cadastrar  o usuário'),async()=>{
        const usersRepository = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            name:'Jon Doe',
            email:'johndow@example.com',
            password:'123456',
        })

        expect(user.id).toEqual(expect.any(String))    }


    it('Deve registrar o password em hash',async ()=> {
        const usersRepository  =new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)      

        const { user } =  await registerUseCase.execute({
        name:'Cadastro01',
        email:'email2@gmail.com',
        password:'123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456',user.password_hash)

   expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Não posso ter email duplicado',async ()=> {
        const usersRepository  =new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)      
        const email ='jondoe@example.com'
        await registerUseCase.execute({
        name:'Cadastro01',
        email,
        password:'123456',           
    })

   await expect(()=>
         registerUseCase.execute({
            name:'Cadastro01',
            email,
            password:'123456',
        }),
    ).rejects.toBeInstanceOf(UserAlrealdyExistsErros)
})

})

