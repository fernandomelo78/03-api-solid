import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsErros } from "./erros/user-already-exists-error";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";


let  usersRepository:inMemoryUsersRepository
let  sut: RegisterUseCase


describe('Register Use Case',()=>{
    beforeEach(()=>{
        usersRepository = new inMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    }

    )

    it('should register user ', async ()=>{
    
        const {user} = await sut.execute({
            name:'John Doe',
            email:'johndoe2@example.com',
            password:'123456',
        })


        expect(user.id).toEqual(expect.any(String))
        //console.log(user.password_hash)
    
    })


    it('should hash user password upon registration', async ()=>{
       beforeEach(()=>{
            usersRepository = new inMemoryUsersRepository()
            sut = new RegisterUseCase(usersRepository)
        })

    
        const {user} = await sut.execute({
            name:'John Doe',
            email:'johndoe2@example.com',
            password:'123456',
        })

        const isPasswordHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordHashed).toBe(true)
        //console.log(user.password_hash)
    
    })


    it('should not be able to register with same email twice', async ()=>{
         beforeEach(()=>{
                usersRepository = new inMemoryUsersRepository()
                sut = new RegisterUseCase(usersRepository)
            })

    
        const email = 'fldm.sc@gmail.com'

        await sut.execute({
            name:'John Doe',
            email,
            password:'123456',
        })

       await expect(()=>
                sut.execute({
                    name:'John Doe',
                    email,
                    password:'123456',
                })).rejects.toBeInstanceOf(UserAlreadyExistsErros)
      
    
    })


})