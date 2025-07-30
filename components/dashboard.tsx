"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon, MessageSquare } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetailedDataViewer } from "./detailed-data-viewer"
import { OverviewStats } from "./overview-stats"
import { DeviceCharts } from "./device-charts"
import { TrendAnalysis } from "./trend-analysis"
import { TopCategories } from "./top-categories"
import { AnalyticsCharts } from "./analytics-charts"
import Link from "next/link"
import Image from "next/image"
import { ChatInterface } from "./chat-interface"
import { useRouter } from "next/navigation"

export function Dashboard() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter();
  const [tabValue, setTabValue] = useState("overview");

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (tabValue === "ai-expert") {
      router.push("/chat");
    }
  }, [tabValue, router]);

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 relative">
              <Image
                src="/covenant-icon.png"
                alt="FDA MedAI Registry Logo"
                width={40}
                height={40}
                className="rounded-lg"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Covenant AI Insights</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">A product of The Covenant Intelligence Group</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              <div className="status-indicator status-active"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Data</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={tabValue} onValueChange={setTabValue} defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700 mb-6">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              Database
            </TabsTrigger>
            <TabsTrigger
              value="ai-expert"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              AI Expert
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeviceCharts />
              <TrendAnalysis />
            </div>
            <TopCategories />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Advanced Analytics */}
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            {/* Detailed Data Table */}
            <DetailedDataViewer />
          </TabsContent>

          <TabsContent value="ai-expert" className="space-y-6"></TabsContent>
        </Tabs>
      </div>

      {/* Chat Bubble */}
      <Link
        href="/chat"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out z-50"
        title="AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Link>
    </div>
  )
}
