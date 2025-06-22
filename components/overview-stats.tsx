"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Users, FileText } from "lucide-react"
import { fetchDetailedDeviceData, type DetailedProcessedData } from "@/lib/detailed-data-fetcher"

export function OverviewStats() {
  const [data, setData] = useState<DetailedProcessedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDetailedDeviceData()
        setData(result)
      } catch (error) {
        console.error("Error loading overview data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Calculate stats
  const currentYear = new Date().getFullYear()
  const lastYear = currentYear - 1
  const currentYearDevices = data.records.filter(
    (r) => new Date(r.dateOfAuthorization).getFullYear() === currentYear,
  ).length
  const lastYearDevices = data.records.filter((r) => new Date(r.dateOfAuthorization).getFullYear() === lastYear).length

  const growthRate = lastYearDevices > 0 ? ((currentYearDevices - lastYearDevices) / lastYearDevices) * 100 : 0
  const isPositiveGrowth = growthRate >= 0

  const recentDevices = data.records.filter((r) => {
    const deviceDate = new Date(r.dateOfAuthorization)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return deviceDate >= thirtyDaysAgo
  }).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Devices */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Devices</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {data.totalRecords.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs">
              All time
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Growth Rate */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">YoY Growth</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {isPositiveGrowth ? "+" : ""}
                {growthRate.toFixed(1)}%
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isPositiveGrowth ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
              }`}
            >
              {isPositiveGrowth ? (
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs">
              {currentYear} vs {lastYear}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Medical Specialties */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Specialties</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.medicalSpecialties.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs">
              Active categories
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent (30d)</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{recentDevices}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs">
              New approvals
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
