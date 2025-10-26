import { Checkin, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    create(data: Prisma.CheckinUncheckedCreateInput) : Promise<Checkin>
    findByUserIdOnDate(userId:String, date: Date): Promise<Checkin | null>

}