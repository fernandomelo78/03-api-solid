import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../prisma/users-repository";




export class inMemoryUsersRepository implements UsersRepository{

    public items: User[] = []

    findbyid(id: string): Promise<User | null> {

        const user  = this.items.find((item) => item.id ==id)

        throw new Error("Method not implemented.");
    }



   async  findByEmail(email: string) {
       const user = this.items.find((item)=>(item.email === email))

       if(!user){
        return null
       }

       return user
    }

    async create(data: Prisma.UserCreateInput) {

        const user =  {
                id:'user-01',
                name:data.name,
                email:data.email,
                password_hash:data.password_hash,
                created_at:new Date(),
            }

            this.items.push(user)

            return user
        }

}