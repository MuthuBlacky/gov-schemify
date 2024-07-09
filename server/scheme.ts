import { db } from "@/lib/db";
import { publicProcedure,router } from "./trpc";
import * as z from "zod";
const schemeRouter = router({
    getSchemes : publicProcedure.query(async ()=>{
        const schemes  = await db.schemes.findMany({
            take : 10,
            orderBy : {
                id : "desc"
            }
        })
        return schemes
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
    }),
    getNewSchemes : publicProcedure.query(async ()=> {
        const schemes = await db.schemes.findMany({
            take : 15,
            orderBy : {
                id : "desc"
            }
        })
        return schemes;
    }),
    getSchemeById : publicProcedure.input(z.string()).query(async ({input})=>{
        const scheme = await db.schemes.findFirst({
            where : {
                id : input
            }
        })
        return scheme
    })
})
export default schemeRouter