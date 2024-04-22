"use client"

import { url } from "inspector"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePromptStore } from "@/store"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trpc } from "@/app/_trpc/client"

import FormDialog from "../../../../components/recentSchems/dialogmodel"
import DialogRecentScheme from "../../_components/dialog-recent-scheme"

const RecentSchemes = () => {
  const setPrompt = usePromptStore().setPrompt
  const prompt = usePromptStore().prompt
  const router = useRouter()
  const recentSchems = trpc.scheme.getNewSchemes
    .useQuery()
    .data?.map((item) => {
      try {
        const schemeJson = JSON.parse(item.schemeName)
        return schemeJson
      } catch (err) {
        return
      }
    })
    .filter((item) => item)
  // console.log(recentSchems)
  return (
    <div className="w-full grid grid-cols-3 h-full justify-between items-baseline gap-3 p-5 bg-repeat">
      {/* <DialogRecentScheme></DialogRecentScheme> */}
      <h1 className="text-5xl w-full col-span-3 text-center font-semibold justify-center">
        Wellcome to gov's schemify
      </h1>
      <h2 className="text-4xl  w-full col-span-3 text-center shadow-sm font-semibold justify-center p-5">
        Recent schemes for you
      </h2>
      {/* @ts-ignore */}
      {recentSchems?.map((item) => {
        return (
          <>
            <div className="mt-3 relative p-6 shadow-md min-w-16 rounded-lg bg-white text-sm">
              <h1 className="text-lg font-medium">Details </h1>
              <br />
              <p>
                {JSON.stringify(item?.Details)
                  ?.replaceAll('"', " ")
                  .replaceAll("{", " ")
                  .replaceAll("}", " ")
                  .replaceAll("[", " ")
                  .replaceAll("]", " ")}
              </p>
              <Link
                href={{
                  pathname: "/chatbot",
                  query: {
                    schemedetail: JSON.stringify(item?.Details)
                      ?.replaceAll('"', " ")
                      .replaceAll("{", " ")
                      .replaceAll("}", " ")
                      .replaceAll("[", " ")
                      .replaceAll("]", " "),
                  },
                }}
                className="flex w-full items-center mt-4 cursor-pointer"
              >
                <p className="text-blue-500">Click here to know more </p>
                <ArrowRight className="w-8 h-4 text-blue-500"></ArrowRight>
              </Link>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default RecentSchemes
