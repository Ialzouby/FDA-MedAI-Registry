"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Users, FileText, Target } from "lucide-react"
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

  // New calculations for the 4 cards
  const uniqueDevelopers = new Set(data.records.map(r => r.deviceDeveloper).filter(Boolean)).size;
  const developerCounts = data.records.reduce((acc, record) => {
    if (record.deviceDeveloper) {
      acc[record.deviceDeveloper] = (acc[record.deviceDeveloper] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const topDeveloperEntry = Object.entries(developerCounts).sort(([, a], [, b]) => b - a)[0];
  const topDeveloperName = topDeveloperEntry ? topDeveloperEntry[0] : 'N/A';
  const topDeveloperCount = topDeveloperEntry ? topDeveloperEntry[1] : 0;
  const uniqueDeviceTypes = new Set(data.records.map(r => r.deviceType).filter(Boolean)).size;

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

      {/* Unique Developers */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Developers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{uniqueDevelopers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs">
              Total developers
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top Developer */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Developer</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{topDeveloperCount}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0 whitespace-nowrap">{topDeveloperName}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs mt-2">
              Devices by top developer
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Device Types */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Device Types</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{uniqueDeviceTypes}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="secondary" className="text-xs">
              Unique device types
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
