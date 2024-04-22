import { userRouter } from "./User"
import schemeRouter from "./scheme"
import { scrapeSchemeRouter } from "./scrape-scheme"
import { publicProcedure, router } from "./trpc"
import { userdetailsRouter } from "./userDetails"

export const appRouter = router({
  test: publicProcedure.query(() => {
    return { message: "Hello World" }
  }),
  scheme : schemeRouter,
  scrapeSchemes : scrapeSchemeRouter,
  useDetails : userdetailsRouter,
  user : userRouter,
})
export type AppRouter = typeof appRouter
