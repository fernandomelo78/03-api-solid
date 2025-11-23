import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-users";
import { afterAll, beforeAll, describe, it } from "vitest";
import request  from "supertest";

describe('Create Check-in (e2e)',()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it('should be able to create a check-in', async ()=>{
        const {token} = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                description: 'Some description.',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            }            
        })
        
        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
         .set('Authorization', `Bearer ${token}`)
         .send({
                   
        })
    })

    
})