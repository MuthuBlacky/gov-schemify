
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    console.log("hi");
    const user = await currentUser();
    // const userId = user?.id
    const body = await req.json();
    const { messages } = body;
    console.log(messages[0])
    // if(!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if(!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Missing messages", { status: 400 });
    }
    // const fetchres = fetch("givtschem")
    // You are a government schemes query resolver. You must answer only for government schemes.
    const instructionMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: messages[0].role == "user" ? "You are a government schemes query resolver. You must answer only for government schemes."  : "I provide you a long paragraph and all you need to do is separate this paragraph by Details,Benefits,Eligibility,Exclusions,Application Process,Documents Required, you need to convert this to json type object this details is always there for you with this same oreder in the paragraph",
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });


    return new NextResponse(JSON.stringify(response.data.choices[0].message), { status: 200 });

  } catch (error) {
    console.error("[CONVERSATION_ERROR]",error);
    console.log(error)
    return new NextResponse("Internal error", { status: 500 });
  }
}