import React from "react"
import Image from "next/image"
import Link from "next/link"

import { currentUser } from "@/lib/auth"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/button"

const Header = async () => {
  const user = await currentUser()
  return (
    <div className="flex w-full justify-between items-center mb-6">
      <Image
        alt="government-logo"
        src={"/images/logoText.png"}
        width={150}
        height={100}
      />
      {!user && (
        <Link href={"/auth/login"}>
          <Button className="bg-[#008606] hover:bg-emerald-600 text-sm">
            Sign in
          </Button>
        </Link>
      )}
      <div className="flex justify-between items-center w-[25%]">
        {user && (
          <Link href={"/recentschemes"}>
            <Button
              className={`text-sm hover:bg-[#008606] hover:text-white`}
              variant={"outline"}
            >
              Recent schemes
            </Button>
          </Link>
        )}
        {user && (
          <Link href={"/chatbot"}>
            <Button
              className={`bg-[#008606] hover:bg-none text-white hover:text-black text-sm`}
              variant={"outline"}
            >
              Get Into GovSchemify
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
