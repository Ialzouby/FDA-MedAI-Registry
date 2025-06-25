"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, TrendingUp, BarChart3 } from "lucide-react"
import {
  fetchDeviceTypeData,
  fetchDomainData,
  fetchModalityData,
  fetchTaskData,
  type ProcessedData,
} from "@/lib/data-fetcher"
import { Heatmap } from "./heatmap"
import { LineChart } from "./line-chart"

interface AnalyticsData {
  deviceType: ProcessedData | null
  domain: ProcessedData | null
  modality: ProcessedData | null
  task: ProcessedData | null
}

export function AnalyticsCharts() {
  const [data, setData] = useState<AnalyticsData>({
    deviceType: null,
    domain: null,
    modality: null,
    task: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"annual" | "cumulative">("annual")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [deviceTypeData, domainData, modalityData, taskData] = await Promise.all([
        fetchDeviceTypeData(),
        fetchDomainData(),
        fetchModalityData(),
        fetchTaskData(),
      ])

      setData({
        deviceType: deviceTypeData,
        domain: domainData,
        modality: modalityData,
        task: taskData,
      })
    } catch (err) {
      console.error("❌ Error loading analytics data:", err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600 dark:text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
            <div className="text-red-800 dark:text-red-200 font-medium">Error loading analytics data:</div>
            <div className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</div>
            <Button onClick={loadAllData} className="mt-3" variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const StatCard = ({ title, value, icon: Icon, description }: any) => (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{description}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
              📊 Advanced Analytics & Visualizations
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Interactive heatmaps and trend analysis across all device categories
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={viewMode} onValueChange={(value: "annual" | "cumulative") => setViewMode(value)}>
              <SelectTrigger className="w-32 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="cumulative">Cumulative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Device Types"
            value={data.deviceType?.categories.length || 0}
            icon={BarChart3}
            description="Total categories"
          />
          <StatCard
            title="Medical Domains"
            value={data.domain?.categories.length || 0}
            icon={TrendingUp}
            description="Specialty areas"
          />
          <StatCard
            title="Modalities"
            value={data.modality?.categories.length || 0}
            icon={BarChart3}
            description="Device modalities"
          />
          <StatCard
            title="Tasks"
            value={data.task?.categories.length || 0}
            icon={TrendingUp}
            description="Device tasks"
          />
        </div>

        {/* Visualization Tabs */}
        <Tabs defaultValue="heatmaps" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700">
          <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              📈 Trend Lines
            </TabsTrigger>
            <TabsTrigger
              value="heatmaps"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              🔥 Heatmaps
            </TabsTrigger>

          </TabsList>

          <TabsContent value="heatmaps" className="mt-6 space-y-8">
            {/* Task Heatmap */}
            {data.task && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    ⚙️ Device Task Heatmap ({viewMode})
                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                      {data.task.categories.length} tasks
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Heatmap
                    data={viewMode === "annual" ? data.task.annual : data.task.cumulative}
                    categories={data.task.categories}
                    years={data.task.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}

            {/* Modality Heatmap */}
            {data.modality && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    🔬 Device Modality Heatmap ({viewMode})
                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                      {data.modality.categories.length} modalities
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Heatmap
                    data={viewMode === "annual" ? data.modality.annual : data.modality.cumulative}
                    categories={data.modality.categories}
                    years={data.modality.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}

            {/* Domain Heatmap */}
            {data.domain && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    🏥 Medical Domain Heatmap ({viewMode})
                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                      {data.domain.categories.length} domains
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Heatmap
                    data={viewMode === "annual" ? data.domain.annual : data.domain.cumulative}
                    categories={data.domain.categories}
                    years={data.domain.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}

            {/* Device Type Heatmap */}
            {data.deviceType && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    🔥 Device Type Heatmap ({viewMode})
                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                      {data.deviceType.categories.length} types
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Heatmap
                    data={viewMode === "annual" ? data.deviceType.annual : data.deviceType.cumulative}
                    categories={data.deviceType.categories.slice(0, 20)} // Show top 20 for readability
                    years={data.deviceType.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="trends" className="mt-6 space-y-8">
            {/* Device Type Trends */}
            {data.deviceType && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">📈 Device Type Trends ({viewMode})</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Top device types by total count over time</p>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={viewMode === "annual" ? data.deviceType.annual : data.deviceType.cumulative}
                    categories={data.deviceType.categories}
                    years={data.deviceType.years}
                    title=""
                    selectedCategories={selectedCategories}
                  />
                </CardContent>
              </Card>
            )}

            {/* Domain Trends */}
            {data.domain && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    🏥 Medical Domain Trends ({viewMode})
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Medical specialty trends over time</p>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={viewMode === "annual" ? data.domain.annual : data.domain.cumulative}
                    categories={data.domain.categories}
                    years={data.domain.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}

            {/* Modality Trends */}
            {data.modality && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    🔬 Device Modality Trends ({viewMode})
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Technology modality adoption over time</p>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={viewMode === "annual" ? data.modality.annual : data.modality.cumulative}
                    categories={data.modality.categories}
                    years={data.modality.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}

            {/* Task Trends */}
            {data.task && (
              <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">⚙️ Device Task Trends ({viewMode})</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Device functionality trends over time</p>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={viewMode === "annual" ? data.task.annual : data.task.cumulative}
                    categories={data.task.categories}
                    years={data.task.years}
                    title=""
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
