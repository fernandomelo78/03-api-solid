import { Checkin, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository{
    async findById(id: string) {
       const checkIn = await prisma.checkin.findUnique({
        where:{
            id,
        }       
       })

       return checkIn
    }
    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkin.findFirst({
            where:{
                user_id:userId,
                create_at:{
                    gte:startOfTheDay.toDate(),
                    lte:endOfTheDay.toDate(),
                }
            }
        })

        return checkIn

    }

    async findManyByUserId(userID: string, page: number){
       const checkIns = prisma.checkin.findMany({
        where :{
            user_id: userID,
        },
        take: 20,
        skip: (page-1)* 20,
       })

       return checkIns
    }
    async countByUserId(userId: string) {
        const count = await prisma.checkin.count({
            where:{
                user_id: userId,
            },
        })

        return count
    }
    async create(data: Prisma.CheckinUncheckedCreateInput)  {
       const checkin = await prisma.checkin.create({
        data,
       })

       return checkin
    }
    async save(data: Checkin)  {
       const checkin = await prisma.checkin.update({
            where :{
                id: data.id,
            },
            data:data,
       })

       return data
    }


}