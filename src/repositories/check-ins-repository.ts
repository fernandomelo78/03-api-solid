import { Checkin, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    findByUserIdOnDate(userId:String, date: Date): Promise<Checkin | null>
    findManyByUserId(userID:String): Promise<Checkin[]>
    create(data: Prisma.CheckinUncheckedCreateInput) : Promise<Checkin>

}