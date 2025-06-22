"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SheetExplorer() {
  const [customGid, setCustomGid] = useState("")
  const [sheetData, setSheetData] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)

  // Current GIDs we're using
  const currentSheets = {
    deviceType: "336724584",
    domain: "1661948723",
    modality: "986877468",
    task: "67316351",
  }

  // Let's try some common GID patterns to find other sheets
  const potentialGids = [
    "0", // Usually the first sheet
    "1",
    "2",
    "336724584", // Current device type
    "1661948723", // Current domain
    "986877468", // Current modality
    "67316351", // Current task
    "123456789", // Test invalid
  ]

  const baseUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub"

  const testSheet = async (gid: string, name: string) => {
    setLoading(gid)
    try {
      const url = `${baseUrl}?gid=${gid}&single=true&output=csv`
      console.log(`🔍 Testing sheet ${name} (GID: ${gid}):`, url)

      const response = await fetch(url)
      const text = await response.text()

      const lines = text.split("\n").slice(0, 10) // First 10 lines
      const firstLine = lines[0] || ""
      const rowCount = text.split("\n").length

      console.log(`📊 Sheet ${name} - Status: ${response.status}, Rows: ${rowCount}`)
      console.log(`📊 Sheet ${name} - First line:`, firstLine)

      setSheetData((prev) => ({
        ...prev,
        [gid]: {
          name,
          status: response.status,
          ok: response.ok,
          rowCount,
          firstLine,
          sampleLines: lines,
          contentLength: text.length,
          url,
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

  const testCustomGid = () => {
    if (customGid) {
      testSheet(customGid, `Custom-${customGid}`)
    }
  }

  const testAllSheets = async () => {
    for (const gid of potentialGids) {
      await testSheet(gid, `Sheet-${gid}`)
      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>🔍 Google Sheets Explorer</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Let's find out which sheets are available and what data they contain
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Sheets */}
        <div>
          <h3 className="font-medium mb-3">Current Sheet GIDs:</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(currentSheets).map(([type, gid]) => (
              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <div className="font-medium">{type}</div>
                  <div className="text-xs text-gray-500">GID: {gid}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => testSheet(gid, type)} disabled={loading === gid}>
                  {loading === gid ? "Testing..." : "Test"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Test Custom GID */}
        <div>
          <h3 className="font-medium mb-3">Test Custom Sheet GID:</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter GID (e.g., 0, 1, 2...)"
              value={customGid}
              onChange={(e) => setCustomGid(e.target.value)}
            />
            <Button onClick={testCustomGid} disabled={!customGid || loading !== null}>
              Test GID
            </Button>
          </div>
        </div>

        {/* Test All Common GIDs */}
        <div>
          <Button onClick={testAllSheets} disabled={loading !== null} className="w-full">
            {loading ? `Testing ${loading}...` : "Test All Common GIDs"}
          </Button>
        </div>

        {/* Results */}
        {Object.keys(sheetData).length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Sheet Test Results:</h3>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <div className="space-y-2">
                  {Object.entries(sheetData).map(([gid, data]: [string, any]) => (
                    <div key={gid} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{data.name}</div>
                        <div className="text-xs text-gray-500">GID: {gid}</div>
                        {data.firstLine && (
                          <div className="text-xs text-gray-600 mt-1 truncate max-w-md">
                            {data.firstLine.substring(0, 100)}...
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        {data.error ? (
                          <Badge variant="destructive">Error</Badge>
                        ) : (
                          <>
                            <Badge variant={data.ok ? "default" : "destructive"}>{data.status}</Badge>
                            {data.rowCount && <div className="text-xs text-gray-500 mt-1">{data.rowCount} rows</div>}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="space-y-4">
                  {Object.entries(sheetData).map(([gid, data]: [string, any]) => (
                    <Card key={gid} className="border">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {data.name} (GID: {gid})
                          </h4>
                          <Badge variant={data.ok ? "default" : "destructive"}>{data.status || "Error"}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {data.error ? (
                          <div className="text-red-600 dark:text-red-400 text-sm">Error: {data.error}</div>
                        ) : (
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>Rows:</strong> {data.rowCount}
                            </div>
                            <div>
                              <strong>Content Length:</strong> {data.contentLength?.toLocaleString()} chars
                            </div>
                            <div>
                              <strong>URL:</strong>
                              <code className="text-xs break-all">{data.url}</code>
                            </div>
                            <div>
                              <strong>Sample Lines:</strong>
                            </div>
                            <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto max-h-32">
                              {data.sampleLines?.join("\n")}
                            </pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 rounded">
          💡 <strong>Tip:</strong> Look for sheets with more rows and different data structures. The current sheets
          might be summary views rather than the full datasets.
        </div>
      </CardContent>
    </Card>
  )
}
