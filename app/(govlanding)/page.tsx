import ScrapeAndStoreSchemes from "@/lib/actions"

import Heroes from "./_component/Heroes"

export default async function Home() {
  const URL = "https://www.myscheme.gov.in/schemes/aius"
  const scrape = await ScrapeAndStoreSchemes(URL)
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <Heroes />
    </div>
  )
}
