"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { fetchDeviceTypeData, fetchDomainData, fetchModalityData, fetchTaskData, type ProcessedData } from "@/lib/data-fetcher"
import { LineChart } from "./line-chart"

export function TrendAnalysis() {
  const [deviceType, setDeviceType] = useState<ProcessedData | null>(null)
  const [domain, setDomain] = useState<ProcessedData | null>(null)
  const [modality, setModality] = useState<ProcessedData | null>(null)
  const [task, setTask] = useState<ProcessedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("deviceType")

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [dt, d, m, t] = await Promise.all([
          fetchDeviceTypeData(),
          fetchDomainData(),
          fetchModalityData(),
          fetchTaskData(),
        ])
        setDeviceType(dt)
        setDomain(d)
        setModality(m)
        setTask(t)
      } catch (error) {
        console.error("Error loading trend data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Approval Trends</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Device trends by category (annual)</p>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4 grid grid-cols-4 gap-2 bg-gray-100 dark:bg-gray-700">
           {/* <TabsTrigger value="deviceType">Device Type</TabsTrigger> */}
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="modality">Modality</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
          </TabsList>

          <TabsContent value="deviceType">
            {loading || !deviceType ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <LineChart
                data={deviceType.annual}
                categories={deviceType.categories}
                years={deviceType.years}
                title="Device Type Trends"
              />
            )}
          </TabsContent>

          <TabsContent value="domain">
            {loading || !domain ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <LineChart
                data={domain.annual}
                categories={domain.categories}
                years={domain.years}
                title="Domain Trends"
              />
            )}
          </TabsContent>

          <TabsContent value="modality">
            {loading || !modality ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <LineChart
                data={modality.annual}
                categories={modality.categories}
                years={modality.years}
                title="Modality Trends"
              />
            )}
          </TabsContent>

          <TabsContent value="task">
            {loading || !task ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <LineChart
                data={task.annual}
                categories={task.categories}
                years={task.years}
                title="Task Trends"
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
