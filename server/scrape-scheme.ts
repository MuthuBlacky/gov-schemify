import { db } from "@/lib/db";
import { publicProcedure,router } from "./trpc";
import * as z from "zod";
export const scrapeSchemeRouter = router({
    getSchemeByLink : publicProcedure.input(z.string()).query(async ({input})=>{
       const scheme = await db.scrappedSchemes.findFirst({
        where : {schemeLink : input}
       });
       return scheme
    }),
    createScheme : publicProcedure.input(z.object({
        schemeLink : z.string(),
        schemeId : z.string(),
    })).mutation(async ({input})=>{
        const scrapedSchemes = await db.scrappedSchemes.create({
            data :{
                schemeLink : input.schemeLink,
                schemeId : input.schemeId
            }
        })
        return scrapedSchemes.id
    })
})