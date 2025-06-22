"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchDetailedDeviceData, type DetailedProcessedData } from "@/lib/detailed-data-fetcher"

export function TrendAnalysis() {
  const [data, setData] = useState<DetailedProcessedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDetailedDeviceData()
        setData(result)
      } catch (error) {
        console.error("Error loading trend data:", error)
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
          <CardTitle className="text-gray-900 dark:text-gray-100">Approval Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate yearly trends
  const yearlyData = data.years.map((year) => ({
    year,
    count: data.records.filter((r) => new Date(r.dateOfAuthorization).getFullYear().toString() === year).length,
  }))

  // Take last 6 years for trend
  const recentYears = yearlyData.slice(-6)
  const maxCount = Math.max(...recentYears.map((y) => y.count))

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Approval Trends</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Device approvals over recent years</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Simple line chart representation */}
          <div className="relative h-32 flex items-end justify-between space-x-2">
            {recentYears.map((yearData, index) => {
              const height = (yearData.count / maxCount) * 100
              return (
                <div key={yearData.year} className="flex flex-col items-center flex-1">
                  <div className="w-full flex justify-center mb-2">
                    <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600">
                      {yearData.count}
                    </Badge>
                  </div>
                  <div
                    className="w-full bg-green-500 dark:bg-green-400 rounded-t transition-all duration-500"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 font-medium">{yearData.year}</div>
                </div>
              )
            })}
          </div>

          {/* Trend summary */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Peak Year</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {yearlyData.reduce((max, current) => (current.count > max.count ? current : max)).year}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Growth</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {(
                    ((recentYears[recentYears.length - 1]?.count || 0) / (recentYears[0]?.count || 1)) * 100 -
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
