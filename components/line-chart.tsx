"use client"

import { useMemo } from "react"

interface LineChartProps {
  data: { [key: string]: { [year: string]: number } }
  categories: string[]
  years: string[]
  title: string
  selectedCategories?: string[]
}

function getColorForCategory(category: string, index: number) {
  const colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
    "#aec7e8",
    "#ffbb78",
    "#98df8a",
    "#ff9896",
    "#c5b0d5",
  ]
  return colors[index % colors.length]
}

export function LineChart({ data, categories, years, title, selectedCategories }: LineChartProps) {
  const { chartData, maxValue } = useMemo(() => {
    const categoriesToShow =
      selectedCategories && selectedCategories.length > 0 ? selectedCategories : categories.slice(0, 10) // Show top 10 by default

    let max = 0
    const processedData = categoriesToShow.map((category) => {
      const values = years.map((year) => data[category]?.[year] || 0)
      const categoryMax = Math.max(...values)
      max = Math.max(max, categoryMax)

      return {
        category,
        values,
        color: getColorForCategory(category, categories.indexOf(category)),
      }
    })

    return { chartData: processedData, maxValue: max }
  }, [data, categories, years, selectedCategories])

  const chartHeight = 300
  const chartWidth = 800
  const padding = { top: 20, right: 20, bottom: 40, left: 60 }

  const xScale = (yearIndex: number) =>
    padding.left + (yearIndex / (years.length - 1)) * (chartWidth - padding.left - padding.right)

  const yScale = (value: number) =>
    chartHeight - padding.bottom - (value / maxValue) * (chartHeight - padding.top - padding.bottom)

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div className="flex gap-6">
        <div className="flex-1">
          <svg width={chartWidth} height={chartHeight} className="border rounded">
            {/* Grid lines */}
            {Array.from({ length: 6 }, (_, i) => {
              const y = padding.top + (i / 5) * (chartHeight - padding.top - padding.bottom)
              const value = Math.round(maxValue * (1 - i / 5))
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity={0.1}
                  />
                  <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="12" fill="currentColor">
                    {value}
                  </text>
                </g>
              )
            })}

            {/* X-axis labels */}
            {years.map((year, index) => {
              if (index % 3 === 0) {
                // Show every 3rd year to avoid crowding
                return (
                  <text
                    key={year}
                    x={xScale(index)}
                    y={chartHeight - padding.bottom + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {year}
                  </text>
                )
              }
              return null
            })}

            {/* Lines */}
            {chartData.map(({ category, values, color }) => {
              const pathData = values
                .map((value, index) => `${index === 0 ? "M" : "L"} ${xScale(index)} ${yScale(value)}`)
                .join(" ")

              return (
                <path
                  key={category}
                  d={pathData}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  className="hover:stroke-4 transition-all"
                />
              )
            })}

            {/* Data points */}
            {chartData.map(({ category, values, color }) =>
              values.map((value, index) => (
                <circle
                  key={`${category}-${index}`}
                  cx={xScale(index)}
                  cy={yScale(value)}
                  r="3"
                  fill={color}
                  className="hover:r-5 transition-all cursor-pointer"
                  title={`${category} (${years[index]}): ${value}`}
                />
              )),
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="w-48 max-h-80 overflow-y-auto">
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-1">
            {chartData.map(({ category, color }) => (
              <div key={category} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                <span className="truncate" title={category}>
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
