"use client"

import React from "react"
import { redirect } from "next/navigation"

import { useCurrentUser } from "@/hooks/use-current-user"

import DialogRecentScheme from "../../_components/dialog-recent-scheme"

const SchemeLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser()
  if (!user) {
    redirect("/")
  }
  return (
    <>
      <div className="h-full flex">
        <main className="flex relative h-full mt-auto mb-7 justify-center w-full">
        <DialogRecentScheme/>
          {children}
        </main>
      </div>
    </>
  )
}
export default SchemeLayout
