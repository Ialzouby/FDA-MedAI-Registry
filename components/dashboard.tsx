"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetailedDataViewer } from "./detailed-data-viewer"
import { OverviewStats } from "./overview-stats"
import { DeviceCharts } from "./device-charts"
import { TrendAnalysis } from "./trend-analysis"
import { TopCategories } from "./top-categories"
import { AnalyticsCharts } from "./analytics-charts"

export function Dashboard() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-sm">FDA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">FDA Medical Device Analytics</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time device approval insights</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700 mb-6">
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
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <OverviewStats />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeviceCharts />
              <TrendAnalysis />
            </div>

            {/* Top Categories */}
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
        </Tabs>
      </div>
    </div>
  )
}
