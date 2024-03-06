import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id
    const body = await req.json();
    const { messages } = body;

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Missing messages", { status: 400 });
    }
    const fetchres = fetch("givtschem")
    const instructionMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
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