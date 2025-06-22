"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

export function DebugPanel() {
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const testGoogleSheetsConnection = async () => {
    setLoading(true)
    const results: any = {}

    // Test URLs from your Python code
    const testUrls = {
      deviceType:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=336724584&single=true&output=csv",
      domain:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=1661948723&single=true&output=csv",
      modality:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=986877468&single=true&output=csv",
      task: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=67316351&single=true&output=csv",
    }

    for (const [name, url] of Object.entries(testUrls)) {
      try {
        console.log(`🔍 Testing ${name}:`, url)

        const response = await fetch(url)
        const text = await response.text()

        console.log(`📊 ${name} response status:`, response.status)
        console.log(`📊 ${name} response headers:`, Object.fromEntries(response.headers.entries()))
        console.log(`📊 ${name} first 500 chars:`, text.substring(0, 500))

        results[name] = {
          status: response.status,
          ok: response.ok,
          contentType: response.headers.get("content-type"),
          textLength: text.length,
          firstLine: text.split("\n")[0],
          sampleData: text.substring(0, 500),
          error: null,
        }
      } catch (error) {
        console.error(`❌ Error testing ${name}:`, error)
        results[name] = {
          status: "ERROR",
          ok: false,
          error: error.message,
          sampleData: null,
        }
      }
    }

    setTestResults(results)
    setLoading(false)
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🔧 Debug Panel - Google Sheets Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testGoogleSheetsConnection} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Testing Connections...
            </>
          ) : (
            "Test Google Sheets URLs"
          )}
        </Button>

        {Object.keys(testResults).length > 0 && (
          <div className="space-y-4">
            {Object.entries(testResults).map(([name, result]: [string, any]) => (
              <Card key={name} className="border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{name}</h4>
                    <div className="flex items-center gap-2">
                      {result.ok ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Badge variant={result.ok ? "default" : "destructive"}>{result.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {result.error ? (
                    <div className="text-red-600 dark:text-red-400 text-sm">Error: {result.error}</div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Content Type:</strong> {result.contentType || "Unknown"}
                      </div>
                      <div>
                        <strong>Content Length:</strong> {result.textLength?.toLocaleString()} characters
                      </div>
                      <div>
                        <strong>First Line:</strong>
                        <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-x-auto">
                          {result.firstLine}
                        </code>
                      </div>
                      <div>
                        <strong>Sample Data:</strong>
                        <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-x-auto max-h-32">
                          {result.sampleData}
                        </pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
