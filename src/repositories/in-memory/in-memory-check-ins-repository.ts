import { User, Prisma, Checkin } from "@prisma/client";
import { UsersRepository } from "../prisma/users-repository";
import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";

export class inMemoryCheckInRepository implements CheckInsRepository{
    public items:Checkin[] = []
    

       
    async findByUserIdOnDate(userId: String, date: Date): Promise<Checkin | null> {
        const checkInOnSameDate = this.items.find(
            (checkIn)=>checkIn.user_id===userId,)

        if(!checkInOnSameDate) {
            return null
        }
    
        throw checkInOnSameDate
    }



    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const checkIn =  {
            id:randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            create_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) :  null,
 
        }

        this.items.push(checkIn)

        return checkIn

    }

}