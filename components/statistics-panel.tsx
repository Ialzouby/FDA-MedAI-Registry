"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Calendar, Target } from "lucide-react"
import type { ProcessedData } from "@/lib/data-fetcher"

interface StatisticsPanelProps {
  data: ProcessedData
  dataType: string
  viewType: "annual" | "cumulative"
}

export function StatisticsPanel({ data, dataType, viewType }: StatisticsPanelProps) {
  const stats = useMemo(() => {
    const currentData = viewType === "annual" ? data.annual : data.cumulative

    // Calculate totals by year
    const yearTotals = data.years.map((year) => {
      const total = data.categories.reduce((sum, category) => {
        return sum + (currentData[category]?.[year] || 0)
      }, 0)
      return { year, total }
    })

    // Calculate totals by category
    const categoryTotals = data.categories.map((category) => {
      const total = data.years.reduce((sum, year) => {
        return sum + (currentData[category]?.[year] || 0)
      }, 0)
      return { category, total }
    })

    // Sort categories by total
    categoryTotals.sort((a, b) => b.total - a.total)

    // Calculate growth trends
    const firstYear = yearTotals[0]
    const lastYear = yearTotals[yearTotals.length - 1]
    const totalGrowth = lastYear && firstYear ? lastYear.total - firstYear.total : 0
    const growthPercentage = firstYear && firstYear.total > 0 ? ((totalGrowth / firstYear.total) * 100).toFixed(1) : "0"

    // Find peak year
    const peakYear = yearTotals.reduce((max, current) => (current.total > max.total ? current : max))

    // Calculate average per year
    const totalSum = yearTotals.reduce((sum, year) => sum + year.total, 0)
    const averagePerYear = Math.round(totalSum / yearTotals.length)

    return {
      yearTotals,
      categoryTotals,
      topCategories: categoryTotals.slice(0, 5),
      totalGrowth,
      growthPercentage,
      peakYear,
      averagePerYear,
      totalSum,
    }
  }, [data, viewType])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Count */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total {viewType === "annual" ? "Annual" : "Cumulative"}</p>
              <p className="text-2xl font-bold">{stats.totalSum.toLocaleString()}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Growth Trend */}
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Growth Rate</p>
              <p className="text-2xl font-bold">{stats.growthPercentage}%</p>
            </div>
            {Number.parseFloat(stats.growthPercentage) >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-200" />
            ) : (
              <TrendingDown className="h-8 w-8 text-green-200" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Peak Year */}
      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Peak Year</p>
              <p className="text-2xl font-bold">{stats.peakYear.year}</p>
              <p className="text-purple-200 text-xs">{stats.peakYear.total.toLocaleString()} total</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      {/* Average per Year */}
      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg per Year</p>
              <p className="text-2xl font-bold">{stats.averagePerYear.toLocaleString()}</p>
            </div>
            <Target className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="md:col-span-2 lg:col-span-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🏆 Top 5 Categories by Total Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.topCategories.map((item, index) => (
              <div
                key={item.category}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={index === 0 ? "default" : "secondary"} className="min-w-8 justify-center">
                    {index + 1}
                  </Badge>
                  <span className="font-medium truncate max-w-md" title={item.category}>
                    {item.category}
                  </span>
                </div>
                <Badge variant="outline" className="font-mono">
                  {item.total.toLocaleString()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
