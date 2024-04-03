import ScrapeAndStoreSchemes from "@/lib/actions"

import Header from "./_component/Header"
import Heroes from "./_component/Heroes"
import Main from "./_component/Main"

export default async function Home() {
  const URL = "https://www.myscheme.gov.in/schemes/skerala"
  // const scrape = await ScrapeAndStoreSchemes(URL)
  return (
    <div className="h-full w-full p-8">
      <Header />
      <Main />
    </div>
  )
}
