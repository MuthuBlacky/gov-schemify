"use server";

import scrapeSchemes from "../scrapper";

const  ScrapeAndStoreSchemes = async (productUrl : string) => {
  if(!productUrl){
    return String("Provide URL")
  }
  try{
     const scrappedSchemes = await scrapeSchemes(productUrl);
     
     return scrappedSchemes;
  }
  catch(error : any){
    console.log(error)
    throw Error(`Failed to scrape data message : ${error.message}`)
  }
}
export default ScrapeAndStoreSchemes;