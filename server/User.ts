import { db } from "@/lib/db";
import { publicProcedure,router } from "./trpc";
import * as z from "zod";
export const userRouter = router({
    getUserId : publicProcedure.input(z.string().email()).query(async ({input})=>{
        const userId = await db.user.findFirst({where : {email : input},select : {id : true,email:true}})
      return userId
    }),
    getAll : publicProcedure.query(async ()=>{
      const user = await db.user.findMany({
        select : {
          email : true
        }
      });
      return user
    })
})