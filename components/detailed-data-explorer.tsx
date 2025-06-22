"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DetailedDataExplorer() {
  const [sheetData, setSheetData] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [customGid, setCustomGid] = useState("")

  const baseUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub"

  // Expected columns from page 9 figure
  const expectedColumns = [
    "Submission #",
    "Date of authorization decision",
    "Device name",
    "Device developer",
    "Validation method (AI labeled)",
    "AI validation method justification",
    "Validation method (human labeled)",
    "RCT (AI labeled)",
    "RCT (human labeled)",
    "Medical specialty",
    "Device classification",
    "Device type",
    "Device Type FDA Group",
    "Device Type Category",
    "Domain",
    "Domain (Code)",
    "Modality",
    "Modality (Code)",
    "Task",
    "Task (Code)",
    "Device function",
    "Key cue(s)",
  ]

  const testSheet = async (gid: string, name: string) => {
    setLoading(gid)
    try {
      const url = `${baseUrl}?gid=${gid}&single=true&output=csv`
      console.log(`🔍 Testing sheet ${name} (GID: ${gid}):`, url)

      const response = await fetch(url)
      const text = await response.text()

      const lines = text.split("\n")
      const firstLine = lines[0] || ""
      const headers = firstLine.split(",").map((h) => h.trim().replace(/"/g, ""))

      // Check how many expected columns match
      const matchingColumns = expectedColumns.filter((col) =>
        headers.some(
          (header) =>
            header.toLowerCase().includes(col.toLowerCase()) || col.toLowerCase().includes(header.toLowerCase()),
        ),
      )

      const matchScore = matchingColumns.length / expectedColumns.length

      console.log(`📊 Sheet ${name} - Headers:`, headers.slice(0, 10))
      console.log(`📊 Sheet ${name} - Match score: ${(matchScore * 100).toFixed(1)}%`)

      setSheetData((prev) => ({
        ...prev,
        [gid]: {
          name,
          status: response.status,
          ok: response.ok,
          rowCount: lines.length,
          firstLine,
          headers,
          matchingColumns,
          matchScore,
          sampleLines: lines.slice(0, 5),
          contentLength: text.length,
          url,
          isDetailedData: matchScore > 0.5, // Consider it detailed data if >50% columns match
        },
      }))
    } catch (error) {
      console.error(`❌ Error testing sheet ${name}:`, error)
      setSheetData((prev) => ({
        ...prev,
        [gid]: {
          name,
          error: error.message,
          url: `${baseUrl}?gid=${gid}&single=true&output=csv`,
        },
      }))
    }
    setLoading(null)
  }

  const testCommonGids = async () => {
    // Test a wider range of GIDs to find the detailed data
    const gidsToTest = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "336724584",
      "1661948723",
      "986877468",
      "67316351", // Current ones
      "100",
      "200",
      "300",
      "400",
      "500", // Some other common patterns
    ]

    for (const gid of gidsToTest) {
      await testSheet(gid, `Sheet-${gid}`)
      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  const testCustomGid = () => {
    if (customGid) {
      testSheet(customGid, `Custom-${customGid}`)
    }
  }

  // Sort sheets by match score
  const sortedSheets = Object.entries(sheetData).sort(([, a]: [string, any], [, b]: [string, any]) => {
    return (b.matchScore || 0) - (a.matchScore || 0)
  })

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>🔍 Detailed Dataset Explorer</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Looking for the page 9 dataset with individual device submissions and comprehensive metadata
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Expected Columns */}
        <div>
          <h3 className="font-medium mb-3">Expected Columns (from page 9):</h3>
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
            {expectedColumns.map((col) => (
              <Badge key={col} variant="outline" className="text-xs">
                {col}
              </Badge>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button onClick={testCommonGids} disabled={loading !== null} className="flex-1">
            {loading ? `Testing ${loading}...` : "Search for Detailed Dataset"}
          </Button>

          <div className="flex gap-2">
            <Input
              placeholder="Custom GID"
              value={customGid}
              onChange={(e) => setCustomGid(e.target.value)}
              className="w-32"
            />
            <Button onClick={testCustomGid} disabled={!customGid || loading !== null}>
              Test
            </Button>
          </div>
        </div>

        {/* Results */}
        {sortedSheets.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Search Results (sorted by match score):</h3>
            <Tabs defaultValue="best-matches" className="w-full">
              <TabsList>
                <TabsTrigger value="best-matches">Best Matches</TabsTrigger>
                <TabsTrigger value="all-results">All Results</TabsTrigger>
              </TabsList>

              <TabsContent value="best-matches">
                <div className="space-y-3">
                  {sortedSheets
                    .filter(([, data]: [string, any]) => data.matchScore > 0.3)
                    .map(([gid, data]: [string, any]) => (
                      <Card
                        key={gid}
                        className={`border-2 ${data.isDetailedData ? "border-green-500" : "border-gray-200"}`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {data.name} (GID: {gid})
                              {data.isDetailedData && <Badge className="ml-2">🎯 Likely Match!</Badge>}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{(data.matchScore * 100).toFixed(1)}% match</Badge>
                              <Badge variant={data.ok ? "default" : "destructive"}>{data.status}</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {data.error ? (
                            <div className="text-red-600 dark:text-red-400 text-sm">Error: {data.error}</div>
                          ) : (
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Rows:</strong> {data.rowCount?.toLocaleString()} |<strong> Columns:</strong>{" "}
                                {data.headers?.length}
                              </div>

                              <div>
                                <strong>Matching Columns ({data.matchingColumns?.length}):</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {data.matchingColumns?.slice(0, 10).map((col: string) => (
                                    <Badge key={col} variant="secondary" className="text-xs">
                                      {col}
                                    </Badge>
                                  ))}
                                  {data.matchingColumns?.length > 10 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{data.matchingColumns.length - 10} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div>
                                <strong>All Headers:</strong>
                                <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto mt-1">
                                  {data.headers?.slice(0, 15).join(", ")}
                                  {data.headers?.length > 15 && "..."}
                                </pre>
                              </div>

                              {data.isDetailedData && (
                                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                                  <div className="text-green-800 dark:text-green-200 text-sm font-medium">
                                    🎯 This looks like the detailed dataset!
                                  </div>
                                  <div className="text-green-700 dark:text-green-300 text-xs mt-1">
                                    URL: <code className="break-all">{data.url}</code>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="all-results">
                <div className="space-y-2">
                  {sortedSheets.map(([gid, data]: [string, any]) => (
                    <div key={gid} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{data.name}</div>
                        <div className="text-xs text-gray-500">
                          GID: {gid} | {data.rowCount} rows | {data.headers?.length} cols
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {(data.matchScore * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 rounded">
          💡 <strong>Looking for:</strong> A sheet with individual device submissions containing columns like
          "Submission #", "Device name", "Device developer", etc. This should have many more rows than the summary
          tables.
        </div>
      </CardContent>
    </Card>
  )
}
