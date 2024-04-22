import ScrapeAndStoreSchemes from "@/lib/actions"

import { serverClient } from "../_trpc/serverClient"
import { agriculture } from "../links"
import Header from "./_component/Header"
import Main from "./_component/Main"

export default async function Home() {
  agriculture.map(async (link) => {
    console.log(link)
    const isScheme = await serverClient.scrapeSchemes.getSchemeByLink(link)
    if (!isScheme) {
      const scrape = await ScrapeAndStoreSchemes(link)
      const scrapedSchemes = await serverClient.scrapeSchemes.createScheme({
        schemeLink: link,
        schemeId: scrape!,
      })
      // console.log(scrapedSchemes)
    }
    return link
  })
  return (
    <div className="h-full w-full p-8">
      <Header />
      <Main />
    </div>
  )
}
