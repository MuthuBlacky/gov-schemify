"use server"
import { serverClient } from "@/app/_trpc/serverClient";
import axios from "axios";
import * as cheerio from 'cheerio';
import { ChatCompletionRequestMessage } from "openai"
export default async function scrapeSchemes(url : string){
  if(!url){
    return
  }
//   curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_a5c0577f-zone-pricewise:48nonx67e8ej -k https://lumtest.com/myip.json
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }
  try{
    //Fetch the product page
   const responce = await axios.get(url,options);
   const $ = cheerio.load(responce.data)

   const title = $('.markdown-options').text().trim();
   const userMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: title,
  }
  console.log(title)
  const newMessages = [userMessage]
  console.log(newMessages)

  const meaningfullSchemes = await axios.post("/api/conversation", {
    messages: newMessages,
  })

  console.log(meaningfullSchemes.data);

  if(meaningfullSchemes.status == 200){
    const createdId = serverClient.scheme.createSchemes({schemeDescription : meaningfullSchemes.data});
    console.log(createdId)
    }
  }
  catch (error: any) {
    console.log(error);
  }
}
