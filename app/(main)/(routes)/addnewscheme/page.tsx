"use client"

import { FormEvent, useState } from "react"
import { Pacifico } from "next/font/google"
import toast from "react-hot-toast"

import ScrapeAndStoreSchemes from "@/lib/actions"
import { createMailTemplate } from "@/lib/mail/template"
import { trpc } from "@/app/_trpc/client"

import { sendmail } from "./mailerlist"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
})
const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname
    console.log(parsedURL)
    if (
      hostname.includes("'www.myscheme.gov.in'") ||
      hostname.includes("myscheme") ||
      hostname.endsWith("myscheme.gov.in")
    ) {
      console.log(hostname)
      return true
    }
  } catch (error) {
    return false
  }
}

const domain = process.env.NEXT_PUBLIC_APP_URL

const sendNewScheme = async (email: string[], html: string) => {
  await sendmail({
    to: email,
    subject: "Hi the new scheme is",
    html: html,
  })
  console.log(email)
}
const Searchbar = () => {
  const usersEmail = trpc.user.getAll.useQuery().data?.map((item) => {
    return item.email!
  })
  console.log(usersEmail)
  const scrapedSchemes = trpc.scrapeSchemes.createScheme.useMutation({})
  // const sche = trpc.scheme.getSchemeById.useQuery();
  const [searchPrompt, setSearchPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emoji, setEmoji] = useState("👋")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt)

    if (!isValidLink) return alert("Please provide a valid link")
    try {
      setIsLoading(true)
      const scrape = await ScrapeAndStoreSchemes(searchPrompt)
      const result = scrapedSchemes.mutateAsync({
        schemeLink: searchPrompt,
        schemeId: scrape!,
      })
      // console.log("scheme id", scrape)
      const html = `<p>${scrape}</p>}`
      console.log(html)
      setEmoji("👍")
      setTimeout(() => {
        setEmoji("👋")
      }, 5000)
      toast.success("Successfully scheme is added !")
      sendNewScheme(usersEmail!, html)
      // Scrape the product page
    } catch (error) {
      console.log(error)
      toast.error("error in adding new scheme")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="text-8xl mb-5 flex justify-center w-full">{emoji}</div>
      <div className="flex flex-col w-full justify-center items-center text-4xl font-serif">
        <h1 className={`${pacifico.className} text-6xl`}>
          Hello Admin Add new scheme here
        </h1>
      </div>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="Enter scheme link"
          className="flex-1 min-w-[400px] items-center w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed"
          disabled={searchPrompt === ""}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  )
}

export default Searchbar
