import { User, Prisma, Checkin } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class inMemoryCheckInRepository implements CheckInsRepository{
    public items:Checkin[] = []


    async findManyByUserId(userId: String) {
        return this.items.filter((item)=> item.user_id ===userId)
    }
    
       
    async findByUserIdOnDate(userId: String, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')


        const checkInOnSameDate = this.items.find(                      
            (checkIn)=>{
                const checkInDate = dayjs(checkIn.create_at)
                const isOnSameDate = 
                checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

                 return checkIn.user_id===userId && isOnSameDate
          
            }
        )

        if(!checkInOnSameDate) {
            return null
        }
    
        return checkInOnSameDate
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