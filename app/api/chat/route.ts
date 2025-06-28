import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, context, deviceInfo } = body

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse(JSON.stringify({ error: "OpenAI API key not configured." }), { status: 500 })
    }

    if (!messages) {
      return new NextResponse(JSON.stringify({ error: "Messages are required." }), { status: 400 })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Create system message with device context if provided
    let systemMessage = "You are a specialized AI assistant for the FDA Medical Device Analytics dashboard. Your expertise is in medical device data, regulations, and market trends. Answer questions based on this persona."
    
    if (context && deviceInfo) {
      systemMessage += `\n\nYou are currently discussing a specific FDA-approved medical device. Here is the device information:\n${context}\n\nWhen answering questions about this device, be specific and reference the provided information. You can discuss the device's function, validation methods, clinical applications, and regulatory aspects.`
    }

    const completion = await openai.chat.completions.create({
      model: "ft:gpt-4.1-2025-04-14:personal::BPAoUBAT",
      messages: [
        {
          role: "system",
          content: systemMessage,
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