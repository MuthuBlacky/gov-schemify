import schemeRouter from "./scheme"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  test: publicProcedure.query(() => {
    return { message: "Hello World" }
  }),
  scheme : schemeRouter
})
export type AppRouter = typeof appRouter
