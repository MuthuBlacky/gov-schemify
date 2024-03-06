import Link from "next/link"
import { currentUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "./ui/button"

import Image from 'next/image'

export const Header = async () => {
  const user = await currentUser()
  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between bg-background p-4",
        "border-b shadow-sm"
      )}
    >
      <div className="hidden md:block">
          <Image
          src={'/logo.png'}
          width={150}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div className="flex w-full justify-between gap-x-2 md:w-[12%]">
        {!user ? (
          <>
            <Link href={"/auth/login"}>
              <Button>Log in</Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button>Sign up</Button>
            </Link>
          </>
        ) : (
          <>
            <Avatar>
              <AvatarImage
                src={
                  user.image == undefined
                    ? "./placeholder.jpg"
                    : user.image!
                }
                alt="User Profile"
              />
              <AvatarFallback>
                {user.name == undefined ? "?" : user.name![0]}
              </AvatarFallback>
            </Avatar>
            <Link href={"/api/auth/signout"}>
              <Button>Log out</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
export default Header
