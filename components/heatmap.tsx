"use client"

import { useMemo } from "react"

interface HeatmapProps {
  data: { [key: string]: { [year: string]: number } }
  categories: string[]
  years: string[]
  title: string
}

export function Heatmap({ data, categories, years, title }: HeatmapProps) {
  const { maxValue, colorScale } = useMemo(() => {
    let max = 0
    Object.values(data).forEach((categoryData) => {
      Object.values(categoryData).forEach((value) => {
        max = Math.max(max, value)
      })
    })

    // Custom 5-color gradient matching Python code
    const colors = ["#2ca02c", "#98df8a", "#ffeb52", "#ff9896", "#d62728"]

    return {
      maxValue: max,
      colorScale: colors,
    }
  }, [data])

  const getColor = (value: number) => {
    if (value === 0) return "#f8f9fa"

    const ratio = value / maxValue
    const colorIndex = Math.min(Math.floor(ratio * 4), 3)
    const colors = ["#2ca02c", "#98df8a", "#ffeb52", "#ff9896", "#d62728"]

    if (ratio === 1) return colors[4]

    const startColor = colors[colorIndex]
    const endColor = colors[colorIndex + 1]

    // Simple color interpolation
    const localRatio = ratio * 4 - colorIndex
    return interpolateColor(startColor, endColor, localRatio)
  }

  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    const hex1 = color1.replace("#", "")
    const hex2 = color2.replace("#", "")

    const r1 = Number.parseInt(hex1.substr(0, 2), 16)
    const g1 = Number.parseInt(hex1.substr(2, 2), 16)
    const b1 = Number.parseInt(hex1.substr(4, 2), 16)

    const r2 = Number.parseInt(hex2.substr(0, 2), 16)
    const g2 = Number.parseInt(hex2.substr(2, 2), 16)
    const b2 = Number.parseInt(hex2.substr(4, 2), 16)

    const r = Math.round(r1 + (r2 - r1) * ratio)
    const g = Math.round(g1 + (g2 - g1) * ratio)
    const b = Math.round(b1 + (b2 - b1) * ratio)

    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">{title}</h3>}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid gap-0.5" style={{ gridTemplateColumns: `200px repeat(${years.length}, 40px)` }}>
            {/* Header row */}
            <div className="sticky left-0 bg-white dark:bg-gray-800 z-10"></div>
            {years.map((year) => (
              <div
                key={year}
                className="text-xs font-medium text-center py-2 transform -rotate-45 origin-center text-gray-900 dark:text-gray-100"
              >
                {year}
              </div>
            ))}

            {/* Data rows */}
            {categories.map((category) => (
              <div key={category} className="contents">
                <div
                  className="sticky left-0 bg-white dark:bg-gray-800 z-10 text-xs font-medium py-2 px-2 border-r border-gray-200 dark:border-gray-600 truncate text-gray-900 dark:text-gray-100"
                  title={category}
                >
                  {category}
                </div>
                {years.map((year) => {
                  const value = data[category]?.[year] || 0
                  return (
                    <div
                      key={`${category}-${year}`}
                      className="h-8 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: getColor(value) }}
                      title={`${category} (${year}): ${value}`}
                    >
                      {value > 0 ? value : ""}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color legend */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-xs text-gray-600 dark:text-gray-400">0</span>
        <div className="flex h-4 w-48 rounded">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: getColor((i / 49) * maxValue) }} />
          ))}
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">{maxValue}</span>
      </div>
    </div>
  )
}
