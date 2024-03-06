import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { currentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"

const Heroes = async () => {
  const user = await currentUser()
  return (
    <>
      <main className="mt-[18%] flex flex-col items-center gap-y-6">
        <h1 className="font-bol text-3xl sm:text-5xl md:text-6xl">
          Welcome to Government Schemify
        </h1>
        <h3 className="text-base font-medium sm:text-xl md:text-2xl">
          The Government you elect is
          <br /> the Government you deserve
        </h3>
      </main>
      <Link href={!user ? "/auth/login" : "/chatbot"}>
        <Button className="mt-8 text-xs font-medium">
          Get into GovSchemify
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </>
  )
}
export default Heroes
