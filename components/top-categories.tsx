"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchDetailedDeviceData, type DetailedProcessedData } from "@/lib/detailed-data-fetcher"

export function TopCategories() {
  const [data, setData] = useState<DetailedProcessedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDetailedDeviceData()
        setData(result)
      } catch (error) {
        console.error("Error loading categories data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !data) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate top categories for different dimensions
  const topDomains = data.domains
    .map((domain) => ({
      name: domain,
      count: data.records.filter((r) => r.domain === domain).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const topModalities = data.modalities
    .map((modality) => ({
      name: modality,
      count: data.records.filter((r) => r.modality === modality).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const topTasks = data.tasks
    .map((task) => ({
      name: task,
      count: data.records.filter((r) => r.task === task).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const CategoryList = ({ categories, title }: { categories: any[]; title: string }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">{title}</h4>
      {categories.map((category, index) => (
        <div
          key={category.name}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{index + 1}</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs" title={category.name}>
              {category.name}
            </span>
          </div>
          <Badge variant="outline" className="border-gray-300 dark:border-gray-600 font-mono">
            {category.count}
          </Badge>
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">🏆 Top Categories</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Leading categories across different dimensions</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="domains" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700">
            <TabsTrigger
              value="domains"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              Domains
            </TabsTrigger>
            <TabsTrigger
              value="modalities"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              Modalities
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="domains" className="mt-6">
            <CategoryList categories={topDomains} title="Top Medical Domains" />
          </TabsContent>

          <TabsContent value="modalities" className="mt-6">
            <CategoryList categories={topModalities} title="Top Device Modalities" />
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <CategoryList categories={topTasks} title="Top Device Tasks" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
