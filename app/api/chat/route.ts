import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse(JSON.stringify({ error: "OpenAI API key not configured." }), { status: 500 })
    }

    if (!messages) {
      return new NextResponse(JSON.stringify({ error: "Messages are required." }), { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a specialized AI assistant for the FDA Medical Device Analytics dashboard. Your expertise is in medical device data, regulations, and market trends. Answer questions based on this persona.",
        },
        ...messages,
      ],
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[CHAT_API_ERROR]", error)
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
} 