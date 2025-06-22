"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchDetailedDeviceData, type DetailedProcessedData } from "@/lib/detailed-data-fetcher"

export function DeviceCharts() {
  const [data, setData] = useState<DetailedProcessedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDetailedDeviceData()
        setData(result)
      } catch (error) {
        console.error("Error loading chart data:", error)
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
          <CardTitle className="text-gray-900 dark:text-gray-100">Device Approvals by Specialty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate specialty counts
  const specialtyCounts = data.medicalSpecialties.map((specialty) => ({
    name: specialty,
    count: data.records.filter((r) => r.medicalSpecialty === specialty).length,
  }))

  // Sort by count and take top 8
  const topSpecialties = specialtyCounts.sort((a, b) => b.count - a.count).slice(0, 8)
  const maxCount = Math.max(...topSpecialties.map((s) => s.count))

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Device Approvals by Specialty</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Top medical specialties by device count</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topSpecialties.map((specialty, index) => {
            const percentage = (specialty.count / maxCount) * 100
            return (
              <div key={specialty.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {specialty.name}
                  </span>
                  <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                    {specialty.count}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
