"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download, Search, Filter } from "lucide-react"
import {
  fetchDetailedDeviceData,
  type DetailedProcessedData,
  type DetailedDeviceRecord,
} from "@/lib/detailed-data-fetcher"
import { DeviceDetailCard } from "./device-detail-card"

export function DetailedDataViewer() {
  const [data, setData] = useState<DetailedProcessedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedDomain, setSelectedDomain] = useState<string>("all")
  const [selectedTask, setSelectedTask] = useState<string>("all")
  const [selectedModality, setSelectedModality] = useState<string>("all")
  const [filteredRecords, setFilteredRecords] = useState<DetailedDeviceRecord[]>([])
  const [selectedDevice, setSelectedDevice] = useState<DetailedDeviceRecord | null>(null)
  const [expandedColumn, setExpandedColumn] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchDetailedDeviceData()
      setData(result)
      setFilteredRecords(result.records)
    } catch (err) {
      console.error("❌ Error loading detailed data:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!data) return

    let filtered = data.records

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.deviceDeveloper.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.submissionNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((record) => record.medicalSpecialty === selectedSpecialty)
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((record) => {
        const year = new Date(record.dateOfAuthorization).getFullYear().toString()
        return year === selectedYear
      })
    }

    if (selectedDomain !== "all") {
      filtered = filtered.filter((record) => record.domain === selectedDomain)
    }

    if (selectedTask !== "all") {
      filtered = filtered.filter((record) => record.task === selectedTask)
    }

    if (selectedModality !== "all") {
      filtered = filtered.filter((record) => record.modality === selectedModality)
    }

    setFilteredRecords(filtered)
  }, [data, searchTerm, selectedSpecialty, selectedYear, selectedDomain, selectedTask, selectedModality])

  const exportToCSV = () => {
    if (!filteredRecords.length) return

    const headers = [
      "Submission #",
      "Date",
      "Device Name",
      "Developer",
      "Medical Specialty",
      "Device Type",
      "Domain",
      "Modality",
      "Task",
      "Validation Method (AI)",
      "RCT (AI)",
    ]

    const rows = filteredRecords.map((record) => [
      record.submissionNumber,
      record.dateOfAuthorization,
      record.deviceName,
      record.deviceDeveloper,
      record.medicalSpecialty,
      record.deviceType,
      record.domain,
      record.modality,
      record.task,
      record.validationMethodAI,
      record.rctAI,
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fda_detailed_data_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSpecialty("all")
    setSelectedYear("all")
    setSelectedDomain("all")
    setSelectedTask("all")
    setSelectedModality("all")
  }

  // For dropdown options - filter out any empty, null, or undefined values
  const tasks = data ? Array.from(new Set(data.records.map((r) => r.task).filter(item => item && item.trim() !== ''))).sort() : []
  const modalities = data ? Array.from(new Set(data.records.map((r) => r.modality).filter(item => item && item.trim() !== ''))).sort() : []
  
  // Also filter the other arrays to be safe
  const filteredYears = data ? data.years.filter(item => item && item.toString().trim() !== '') : []
  const filteredSpecialties = data ? data.medicalSpecialties.filter(item => item && item.trim() !== '') : []
  const filteredDomains = data ? data.domains.filter(item => item && item.trim() !== '') : []
  
  // Debug logging to help identify empty values
  if (data) {
    console.log('Debug - Original arrays:', {
      years: data.years,
      specialties: data.medicalSpecialties,
      domains: data.domains,
      tasks: data.records.map(r => r.task),
      modalities: data.records.map(r => r.modality)
    })
    console.log('Debug - Filtered arrays:', {
      years: filteredYears,
      specialties: filteredSpecialties,
      domains: filteredDomains,
      tasks,
      modalities
    })
  }

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600 dark:text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Loading detailed FDA device data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
            <div className="text-red-800 dark:text-red-200 font-medium">Error loading data:</div>
            <div className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</div>
            <Button onClick={loadData} className="mt-3" variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-3 text-2xl font-bold">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-bold text-sm">📋</span>
              </div>
              Detailed Device Database
              <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold">
                {filteredRecords.length} records
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-11">
              Complete FDA device approval database with advanced filtering and AI-powered insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={clearFilters} variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            <Button onClick={exportToCSV} variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search devices, developers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white transition-all duration-200"
            />
          </div>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white transition-all duration-200">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="all">All Years</SelectItem>
              {filteredYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white transition-all duration-200">
              <SelectValue placeholder="Medical Specialty" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="all">All Specialties</SelectItem>
              {filteredSpecialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white transition-all duration-200">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="all">All Domains</SelectItem>
              {filteredDomains.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedModality} onValueChange={setSelectedModality}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white transition-all duration-200">
              <SelectValue placeholder="Modality" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="all">All Modalities</SelectItem>
              {modalities.map((modality) => (
                <SelectItem key={modality} value={modality}>
                  {modality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white transition-all duration-200">
              <SelectValue placeholder="Task" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="all">All Tasks</SelectItem>
              {tasks.map((task) => (
                <SelectItem key={task} value={task}>
                  {task}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border rounded-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                  Submission #
                </th>
                <th className="text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                  Date
                </th>
                <th className="text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                  Device Name
                </th>
                <th className="text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                  Developer
                </th>
                <th className="text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                  Specialty
                </th>
                <th
                  className={`text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 cursor-pointer min-w-[120px] ${expandedColumn === 'domain' ? 'w-96' : 'w-40'}`}
                  onClick={() => setExpandedColumn(expandedColumn === 'domain' ? null : 'domain')}
                >
                  Domain
                </th>
                <th
                  className={`text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 cursor-pointer min-w-[120px] ${expandedColumn === 'modality' ? 'w-96' : 'w-40'}`}
                  onClick={() => setExpandedColumn(expandedColumn === 'modality' ? null : 'modality')}
                >
                  Modality
                </th>
                <th
                  className={`text-left p-4 font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 cursor-pointer min-w-[120px] ${expandedColumn === 'task' ? 'w-96' : 'w-40'}`}
                  onClick={() => setExpandedColumn(expandedColumn === 'task' ? null : 'task')}
                >
                  Task
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.slice(0, 50).map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-all duration-200 cursor-pointer group"
                  onClick={() => setSelectedDevice(record)}
                >
                  <td className="p-4 font-mono text-xs text-gray-900 dark:text-gray-100 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {record.submissionNumber}
                  </td>
                  <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">{record.dateOfAuthorization}</td>
                  <td className="p-4 max-w-xs">
                    <div className="truncate text-gray-900 dark:text-gray-100 font-semibold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" title={record.deviceName}>
                      {record.deviceName}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="truncate text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" title={record.deviceDeveloper}>
                      {record.deviceDeveloper}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-all duration-200"
                    >
                      {record.medicalSpecialty}
                    </Badge>
                  </td>
                  <td
                    className={`p-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors ${expandedColumn === 'domain' ? 'whitespace-normal max-w-3xl' : 'truncate max-w-xs'}`}
                  >
                    {record.domain.replace(/\s*\([^)]*\)/g, "")}
                  </td>
                  <td
                    className={`p-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors ${expandedColumn === 'modality' ? 'whitespace-normal max-w-3xl' : 'truncate max-w-xs'}`}
                  >
                    {record.modality.replace(/\s*\([^)]*\)/g, "")}
                  </td>
                  <td
                    className={`p-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors ${expandedColumn === 'task' ? 'whitespace-normal max-w-3xl' : 'truncate max-w-xs'}`}
                  >
                    {record.task.replace(/\s*\([^)]*\)/g, "")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRecords.length > 50 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              Showing first 50 of {filteredRecords.length} results
            </div>
          )}
        </div>
      </CardContent>

      {/* Device Detail Card Popup */}
      {selectedDevice && (
        <DeviceDetailCard
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </Card>
  )
}
