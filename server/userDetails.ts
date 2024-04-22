import { db } from "@/lib/db";
import { router,publicProcedure } from "./trpc";
import * as z from "zod";
import mongoose, { Types } from "mongoose";
const stringOrObjectIdSchema = z.string().refine(value => {
    try {
      new mongoose.Types.ObjectId(value);
      return true;
    } catch {
      return false;
    }
  }, {
    message: 'Input must be a string or a valid MongoDB ObjectId'
  });
export const userdetailsRouter = router({
    getAll : publicProcedure.query(async()=>{
        const userDetails = await db.userDetails.findMany();
        return userDetails;
    }),
    getUserDetails : publicProcedure.input(z.string()).query(async ({input})=>{
        // console.log(input)
        const userDetails = await db.userDetails.findFirst({where : {
            userId : input
        }})
        // console.log(userDetails?.id)
        return userDetails
    }),
    createUserDetails : publicProcedure.input(z.object({
        phoneNo : z.string(),
        domain : z.string(),
        userId : z.string()
    })).mutation(async ({input})=>{
     const createdUserDetails = await db.userDetails.create({
        data : {
            domain : input.domain,
            phoneNo : input.phoneNo,
            userId : input.userId
        }
     })
     return createdUserDetails;
    })
})