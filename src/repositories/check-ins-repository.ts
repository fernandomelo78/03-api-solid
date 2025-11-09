import { Checkin, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    findById(id:string): Promise<Checkin | null>
    findByUserIdOnDate(userId:String, date: Date): Promise<Checkin | null>
    findManyByUserId(userID:String, page:number): Promise<Checkin[]>
    countByUserId(userId:string): Promise<number>
    create(data: Prisma.CheckinUncheckedCreateInput) : Promise<Checkin>
    save(checkIn:Checkin): Promise<Checkin>
}