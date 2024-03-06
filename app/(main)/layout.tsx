"use client"

import React from "react"
import { redirect } from "next/navigation"

import { useCurrentUser } from "@/hooks/use-current-user"

import Navigation from "./_components/navigation"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser()
  if (!user) {
    redirect("/")
  }
  return (
    <>
      <div className="flex h-full">
        <Navigation />

        <main className="flex relative z-[999999] mt-auto mb-7 justify-center w-full">
          {children}
        </main>
      </div>
    </>
  )
}
export default MainLayout
