import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-users";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request  from "supertest";

describe('Validate Check-in (e2e)',()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it('should be able to create a check-in', async ()=>{
        const {token} = await createAndAuthenticateUser(app)
         const user = await  prisma.user.findFirstOrThrow() //pega o primeiro registro de usuários

        const gym = await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                description: 'Some description.',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            }            
        })

     
        let checkin = await prisma.checkin.create({
            data:
                {
                   gym_id: gym.id,
                   user_id: user.id
                },
            })
        
        const response = await request(app.server)
        .patch(`/check-ins/${checkin.id}/validade`)
         .set('Authorization', `Bearer ${token}`)
         .send()
    
         
         expect(response.status).toEqual(204)

         checkin = await prisma.checkin.findUniqueOrThrow({
            where:{
                id:checkin.id,
            },
         })

         expect(checkin.validated_at).toEqual(expect.any(Date))
    
        })

    
})