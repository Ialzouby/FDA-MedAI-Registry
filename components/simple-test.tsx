"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { testFetchRawData } from "@/lib/simple-data-fetcher"

export function SimpleTest() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    // Test the Device Type URL first
    const deviceTypeUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=336724584&single=true&output=csv"

    const testResult = await testFetchRawData(deviceTypeUrl)
    setResult(testResult)
    setLoading(false)
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>🧪 Simple Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTest} disabled={loading}>
          {loading ? "Testing..." : "Test Device Type Data"}
        </Button>

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <h4 className="font-medium mb-2">Result:</h4>
              <pre className="text-xs overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>

            {result.success && result.headers && (
              <div>
                <h4 className="font-medium mb-2">Headers Found:</h4>
                <div className="flex flex-wrap gap-1">
                  {result.headers.map((header: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs">
                      {header.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.success && result.lines && (
              <div>
                <h4 className="font-medium mb-2">First Few Lines:</h4>
                <div className="space-y-1">
                  {result.lines.map((line: string, index: number) => (
                    <div key={index} className="text-xs font-mono p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <strong>Line {index}:</strong> {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
