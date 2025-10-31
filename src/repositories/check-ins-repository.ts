import { Checkin, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    findByUserIdOnDate(userId:String, date: Date): Promise<Checkin | null>
    findManyByUserId(userID:String, page:number): Promise<Checkin[]>
    countByUserId(userId: String): Promise<number>
    create(data: Prisma.CheckinUncheckedCreateInput) : Promise<Checkin>

}