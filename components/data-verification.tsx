"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchDeviceTypeData, type ProcessedData } from "@/lib/data-fetcher"

export function DataVerification() {
  const [parsedData, setParsedData] = useState<ProcessedData | null>(null)
  const [loading, setLoading] = useState(false)

  const testDataParsing = async () => {
    setLoading(true)
    try {
      const result = await fetchDeviceTypeData()
      setParsedData(result)
      console.log("✅ Parsed data:", result)
    } catch (error) {
      console.error("❌ Parsing error:", error)
    }
    setLoading(false)
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>🔍 Data Parsing Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testDataParsing} disabled={loading}>
          {loading ? "Parsing..." : "Test Data Parsing"}
        </Button>

        {parsedData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Categories Found:</h4>
                <Badge variant="outline">{parsedData.categories.length} total</Badge>
                <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                  {parsedData.categories.slice(0, 10).map((category) => (
                    <div key={category} className="text-xs p-1 bg-gray-100 dark:bg-gray-700 rounded">
                      {category}
                    </div>
                  ))}
                  {parsedData.categories.length > 10 && (
                    <div className="text-xs text-gray-500">... and {parsedData.categories.length - 10} more</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Years Found:</h4>
                <Badge variant="outline">{parsedData.years.length} total</Badge>
                <div className="mt-2 flex flex-wrap gap-1">
                  {parsedData.years.map((year) => (
                    <Badge key={year} variant="secondary" className="text-xs">
                      {year}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sample Annual Data:</h4>
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Category</th>
                      {parsedData.years.slice(0, 5).map((year) => (
                        <th key={year} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">
                          {year}
                        </th>
                      ))}
                      <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.categories.slice(0, 5).map((category) => (
                      <tr key={category}>
                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium max-w-48 truncate">
                          {category}
                        </td>
                        {parsedData.years.slice(0, 5).map((year) => (
                          <td key={year} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">
                            {parsedData.annual[category]?.[year] || 0}
                          </td>
                        ))}
                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
