"use client"

import { ChatInterface } from "@/components/chat-interface"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow-md z-10">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href="/">
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Assistant</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your guide to medical device data</p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 h-full">
          <ChatInterface />
        </div>
      </main>
    </div>
  )
} 