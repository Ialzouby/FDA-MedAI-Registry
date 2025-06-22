"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { ProcessedData } from "@/lib/data-fetcher"

interface DataInspectorProps {
  data: ProcessedData
  dataType: string
}

export function DataInspector({ data, dataType }: DataInspectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [viewMode, setViewMode] = useState<"annual" | "cumulative">("annual")

  const currentData = viewMode === "annual" ? data.annual : data.cumulative

  // Get sample data for first few categories
  const sampleCategories = data.categories.slice(0, 5)
  const sampleYears = data.years.slice(0, 10)

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📊 Data Inspector - {dataType}
            <Badge variant="outline">{data.categories.length} categories</Badge>
            <Badge variant="outline">{data.years.length} years</Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "annual" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("annual")}
            >
              Annual Data
            </Button>
            <Button
              variant={viewMode === "cumulative" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cumulative")}
            >
              Cumulative Data
            </Button>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sample Categories:</h4>
            <div className="flex flex-wrap gap-1">
              {sampleCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category.length > 30 ? `${category.substring(0, 30)}...` : category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Available Years:</h4>
            <div className="flex flex-wrap gap-1">
              {data.years.map((year) => (
                <Badge key={year} variant="outline" className="text-xs">
                  {year}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sample Data ({viewMode}):</h4>
            <div className="overflow-x-auto">
              <table className="text-xs border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Category</th>
                    {sampleYears.map((year) => (
                      <th key={year} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleCategories.map((category) => (
                    <tr key={category}>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium max-w-48 truncate">
                        {category}
                      </td>
                      {sampleYears.map((year) => (
                        <td key={year} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">
                          {currentData[category]?.[year] || 0}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            💡 Check browser console for detailed fetch logs and raw data samples
          </div>
        </CardContent>
      )}
    </Card>
  )
}
