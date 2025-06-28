"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, MessageSquare, Info, Send, Loader2 } from "lucide-react"
import { type DetailedDeviceRecord } from "@/lib/detailed-data-fetcher"

interface DeviceDetailCardProps {
  device: DetailedDeviceRecord
  onClose: () => void
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function DeviceDetailCard({ device, onClose }: DeviceDetailCardProps) {
  const [activeTab, setActiveTab] = useState<"details" | "chat">("details")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setChatMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Create a context about the device for the AI
      const deviceContext = `
Device Information:
- Name: ${device.deviceName}
- Developer: ${device.deviceDeveloper}
- Submission: ${device.submissionNumber}
- Date: ${device.dateOfAuthorization}
- Medical Specialty: ${device.medicalSpecialty}
- Device Type: ${device.deviceType}
- Domain: ${device.domain}
- Modality: ${device.modality}
- Task: ${device.task}
- Function: ${device.deviceFunction}
- Validation Method (AI): ${device.validationMethodAI}
- AI Validation Justification: ${device.aiValidationJustification}
- RCT (AI): ${device.rctAI}
- Key Cues: ${device.keyCues}
      `.trim()

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          context: deviceContext,
          deviceInfo: {
            name: device.deviceName,
            developer: device.deviceDeveloper,
            submission: device.submissionNumber,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setChatMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[95vh] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white dark:text-gray-900 font-bold text-sm">AI</span>
            </div>
            <div className="flex flex-col min-w-0">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-xl font-bold truncate">
                {device.deviceName}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{device.deviceDeveloper}</span>
                <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 ml-2">
                  {device.submissionNumber}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center h-full">
            <Button onClick={onClose} variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8 p-0 ml-4 flex items-center justify-center">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "details" | "chat")}>
            <TabsList className="flex w-full justify-center gap-3 bg-transparent border-0 pt-6 pb-4">
              <TabsTrigger
                value="details"
                className="px-6 py-2 rounded-full transition-all font-medium text-base border-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600
                  data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-gray-900
                  dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900 dark:data-[state=active]:border-white
                  data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 data-[state=inactive]:border-gray-300 dark:data-[state=inactive]:border-gray-700"
              >
                <Info className="h-4 w-4 mr-2" />
                Device Details
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="px-6 py-2 rounded-full transition-all font-medium text-base border-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600
                  data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-gray-900
                  dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900 dark:data-[state=active]:border-white
                  data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 data-[state=inactive]:border-gray-300 dark:data-[state=inactive]:border-gray-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="px-8 pb-8 pt-2">
              <ScrollArea className="h-[65vh] pr-2">
                <div className="flex flex-col gap-8">
                  {/* Top two cards row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Developer:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-semibold">{device.deviceDeveloper}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Submission Date:</span>
                          <span className="text-gray-900 dark:text-gray-100">{device.dateOfAuthorization}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Medical Specialty:</span>
                          <Badge variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            {device.medicalSpecialty}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Device & Technology
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Device Type:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-semibold">{device.deviceType}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Domain:</span>
                          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                            {device.domain}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Modality:</span>
                          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                            {device.modality}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Task:</span>
                          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                            {device.task}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Device Function card */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Device Function
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                      {device.deviceFunction}
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="px-8 pb-8 pt-2">
              <div className="flex flex-col h-[65vh]">
                <ScrollArea className="flex-1 mb-6 pr-2">
                  <div className="space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                        <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="h-8 w-8 text-white dark:text-gray-900" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Ask about {device.deviceName}</h3>
                        <p className="text-sm max-w-md mx-auto">
                          I can help explain the device's function, validation methods, clinical applications, and answer any questions about this FDA-approved medical device.
                        </p>
                      </div>
                    )}
                    
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                            message.role === "user"
                              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${message.role === "user" ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                              <Loader2 className="h-3 w-3 text-white dark:text-gray-900 animate-spin" />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">AI is analyzing the device information...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mt-2">
                  <Textarea
                    placeholder="Ask about this device's function, validation, or clinical applications..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 resize-none border-0 bg-transparent focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    rows={2}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!inputMessage.trim() || isLoading}
                    className="self-end bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 