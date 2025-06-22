"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, Bot } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages: Message[] = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get response from AI")
      }

      const data = await response.json()
      setMessages([...newMessages, { role: "assistant", content: data.response }])
    } catch (error) {
      const err = error as Error
      console.error("Chat error:", err)
      setMessages([
        ...newMessages,
        { role: "assistant", content: `Sorry, I encountered an error: ${err.message}` },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const MessageBubble = ({ msg }: { msg: Message }) => {
    const isUser = msg.role === 'user'
    return (
      <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && (
          <Avatar className="h-8 w-8 bg-gray-200 dark:bg-gray-700">
            <AvatarFallback>
              <Bot className="h-5 w-5 text-gray-500" />
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-lg px-4 py-2 max-w-lg break-words ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
          }`}
        >
          {msg.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6 overflow-y-auto pr-4 pb-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 pt-16">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-medium">AI Assistant</h2>
            <p className="text-sm">Ask me anything about medical device data!</p>
          </div>
        ) : (
          messages.map((msg, index) => <MessageBubble key={index} msg={msg} />)
        )}
        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 bg-gray-200 dark:bg-gray-700">
              <AvatarFallback>
                <Bot className="h-5 w-5 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <div className="rounded-lg px-4 py-2 bg-white dark:bg-gray-800">
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto pt-4 bg-gray-100 dark:bg-gray-950">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="rounded-full bg-blue-600 hover:bg-blue-700" size="icon">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
} 