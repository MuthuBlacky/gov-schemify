"use client"

// import { url } from "inspector"
// import axios from "axios"
// import * as cheerio from "cheerio"
// import { ChatCompletionRequestMessage } from "openai"

// import ScrapeAndStoreSchemes from "@/lib/actions"

// import { serverClient } from "../_trpc/serverClient"
// import Heroes from "./_component/Heroes"

// export default async function Home() {
//   const URL = "https://www.myscheme.gov.in/schemes/pgsgategpatqspmtmempugc"
//   // const scrape = await ScrapeAndStoreSchemes(URL)
//   if (!URL) {
//     return
//   }
//   //   curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_a5c0577f-zone-pricewise:48nonx67e8ej -k https://lumtest.com/myip.json
//   const username = String(process.env.BRIGHT_DATA_USERNAME)
//   const password = String(process.env.BRIGHT_DATA_PASSWORD)
//   const port = 22225
//   const session_id = (1000000 * Math.random()) | 0

//   const options = {
//     auth: {
//       username: `${username}-session-${session_id}`,
//       password,
//     },
//     host: "brd.superproxy.io",
//     port,
//     rejectUnauthorized: false,
//   }
//   try {
//     //Fetch the product page
//     const responce = await axios.get(URL, options)
//     const $ = cheerio.load(responce.data)

//     const title = $(".markdown-options").text().trim()
//     const userMessage: ChatCompletionRequestMessage = {
//       role: "system",
//       content: title,
//     }
//     console.log(title)
//     const newMessages = [userMessage]
//     console.log(newMessages)

//     const meaningfullSchemes = await axios.post("/api/conversation", {
//       messages: newMessages,
//     })
//     console.log(meaningfullSchemes.data)
//     if (meaningfullSchemes.status == 200) {
//       const createdId = serverClient.scheme.createSchemes({
//         schemeDescription: meaningfullSchemes.data,
//       })
//       console.log(createdId)
//     }
//   } catch (error: any) {
//     console.log(error)
//   }
//   return (
//     <div className="flex h-full w-full flex-col items-center justify-center text-center">
//       <Heroes />
//     </div>
//   )
// }
import React, { useEffect, useState } from "react"
import axios from "axios"
import * as cheerio from "cheerio"
import { ChatCompletionRequestMessage } from "openai"

// import { trpc } from "../_trpc/client"
// import Heroes from "./_component/Heroes"

const Home = () => {
  const [title, setTitle] = useState("")
  const [meaningfulSchemesData, setMeaningfulSchemesData] = useState(null)
  const URL = "https://www.myscheme.gov.in/schemes/pgsgategpatqspmtmempugc"

  const fetchSchemeData = async () => {
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0

    const options = {
      auth: {
        username: `${username}-session-${session_id}`,
        password,
      },
      host: "brd.superproxy.io",
      port,
      rejectUnauthorized: false,
    }

    try {
      const response = await axios.get(URL, options)
      console.log(response.status)
      
      const $ = cheerio.load(response.data)
      const pageTitle = $(".markdown-options").text().trim()
      console.log(pageTitle)
      setTitle(pageTitle)

      const userMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: pageTitle,
      }

      const newMessages = [userMessage]
      const meaningfulSchemesResponse = await axios.post("/api/conversation", {
        messages: newMessages,
      })

      if (meaningfulSchemesResponse.status === 200) {
        setMeaningfulSchemesData(meaningfulSchemesResponse.data)
        console.log(meaningfulSchemesData)
        // const createdId = trpc.scheme.createSchemes({
        //   schemeDescription: meaningfulSchemesResponse.data,
        // })
        // console.log(createdId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSchemeData()
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      {/* <Heroes /> */}
      <h1>{title}</h1>
      {meaningfulSchemesData && (
        <div>{JSON.stringify(meaningfulSchemesData)}</div>
      )}
    </div>
  )
}

export default Home
