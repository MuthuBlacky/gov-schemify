import { db } from "@/lib/db";
import { publicProcedure,router } from "./trpc";
import * as z from "zod";
const schemeRouter = router({
    getSchemes : publicProcedure.query(async ()=>{
        const schemes  = await db.schemes.findMany({select : {
            schemeName : true
        }})
        const allSchemes = schemes.map(item => item.schemeName)
        return allSchemes
    }),
    createSchemes : publicProcedure.input(z.object({
        schemeDescription : z.string()
    })).mutation(async ({input}) =>{
        const createdId = db.schemes.create({
            data : {
                schemeName : input.schemeDescription
            },
        })
        return (await createdId).id
    })
})
export default schemeRouter