"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import type { ProcessedData } from "@/lib/data-fetcher"

interface DataTableProps {
  data: ProcessedData
  dataType: string
  viewType: "annual" | "cumulative"
}

type SortDirection = "asc" | "desc" | null

export function DataTable({ data, dataType, viewType }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [minValue, setMinValue] = useState("")
  const [maxValue, setMaxValue] = useState("")

  const currentData = viewType === "annual" ? data.annual : data.cumulative

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.categories.filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase()))

    // Apply value filters
    if (minValue || maxValue) {
      filtered = filtered.filter((category) => {
        const categoryData = currentData[category] || {}
        const values = Object.values(categoryData)
        const total = values.reduce((sum, val) => sum + val, 0)
        const min = minValue ? Number.parseInt(minValue) : 0
        const max = maxValue ? Number.parseInt(maxValue) : Number.POSITIVE_INFINITY
        return total >= min && total <= max
      })
    }

    // Sort data
    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue: number
        let bValue: number

        if (sortColumn === "category") {
          aValue = a.localeCompare(b)
          bValue = 0
        } else if (sortColumn === "total") {
          aValue = Object.values(currentData[a] || {}).reduce((sum, val) => sum + val, 0)
          bValue = Object.values(currentData[b] || {}).reduce((sum, val) => sum + val, 0)
        } else {
          // Sorting by specific year
          aValue = currentData[a]?.[sortColumn] || 0
          bValue = currentData[b]?.[sortColumn] || 0
        }

        if (sortColumn === "category") {
          return sortDirection === "asc" ? aValue : -aValue
        }
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      })
    }

    return filtered
  }, [data.categories, searchTerm, sortColumn, sortDirection, minValue, maxValue, currentData])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
      if (sortDirection === "desc") {
        setSortColumn(null)
      }
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-4 w-4" />
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />
    if (sortDirection === "desc") return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const exportToCSV = () => {
    const headers = ["Category", ...data.years, "Total"]
    const rows = filteredAndSortedData.map((category) => {
      const categoryData = currentData[category] || {}
      const yearValues = data.years.map((year) => categoryData[year] || 0)
      const total = yearValues.reduce((sum, val) => sum + val, 0)
      return [category, ...yearValues, total]
    })

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${dataType}_${viewType}_data.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const displayYears = yearFilter === "all" ? data.years : data.years.filter((year) => year === yearFilter)

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📊 {dataType} Data Table ({viewType})<Badge variant="outline">{filteredAndSortedData.length} rows</Badge>
          </CardTitle>
          <Button onClick={exportToCSV} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {data.years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Min total value"
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />

          <Input
            placeholder="Max total value"
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setYearFilter("all")
              setMinValue("")
              setMaxValue("")
              setSortColumn(null)
              setSortDirection(null)
            }}
          >
            Clear Filters
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-96 border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
              <tr>
                <th className="text-left p-3 border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("category")}
                    className="flex items-center gap-2 font-semibold"
                  >
                    Category
                    {getSortIcon("category")}
                  </Button>
                </th>
                {displayYears.map((year) => (
                  <th key={year} className="text-center p-3 border-b min-w-20">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(year)}
                      className="flex items-center gap-1 font-semibold"
                    >
                      {year}
                      {getSortIcon(year)}
                    </Button>
                  </th>
                ))}
                <th className="text-center p-3 border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("total")}
                    className="flex items-center gap-2 font-semibold"
                  >
                    Total
                    {getSortIcon("total")}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((category, index) => {
                const categoryData = currentData[category] || {}
                const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0)

                return (
                  <tr
                    key={category}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/50 dark:bg-gray-750"
                    }`}
                  >
                    <td className="p-3 border-b font-medium max-w-xs">
                      <div className="truncate" title={category}>
                        {category}
                      </div>
                    </td>
                    {displayYears.map((year) => {
                      const value = categoryData[year] || 0
                      return (
                        <td key={year} className="p-3 border-b text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              value > 0
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "text-gray-400"
                            }`}
                          >
                            {value || "-"}
                          </span>
                        </td>
                      )
                    })}
                    <td className="p-3 border-b text-center">
                      <Badge variant={total > 0 ? "default" : "secondary"}>{total}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No data matches your current filters. Try adjusting your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
