import Papa from "papaparse"

// Google Sheets URLs from your Python code
export const DATA_SOURCES = {
  deviceType:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=336724584&single=true&output=csv",
  domain:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=1661948723&single=true&output=csv",
  modality:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=986877468&single=true&output=csv",
  task: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?gid=67316351&single=true&output=csv",
}

export interface ProcessedData {
  annual: { [key: string]: { [year: string]: number } }
  cumulative: { [key: string]: { [year: string]: number } }
  categories: string[]
  years: string[]
}

async function fetchCSV(url: string): Promise<string[][]> {
  const response = await fetch(url)
  const csvText = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      complete: (results) => resolve(results.data as string[][]),
      error: (error) => reject(error),
    })
  })
}

export async function fetchDeviceTypeData(): Promise<ProcessedData> {
  console.log("🔍 Fetching Device Type data from:", DATA_SOURCES.deviceType)
  const data = await fetchCSV(DATA_SOURCES.deviceType)

  console.log("📊 Raw Device Type data structure:")
  console.log("First row:", data[0])
  console.log("Second row:", data[1])
  console.log("Third row:", data[2])

  // Based on the debug output, the structure is:
  // Column 0: Year
  // Column 1: Device Type (this is what we want as categories)
  // Column 2: Empty
  // Column 3: "0" (seems to be a placeholder)
  // Columns 4-26: Years 1995, 1997, 1998, 2001, 2004, 2005, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024

  const headerRow = data[0]
  const yearColumns = headerRow.slice(4, 26) // Years from columns 4-25
  const validYears = yearColumns.filter((year) => year && /^\d{4}$/.test(year))

  console.log("📅 Found years:", validYears)

  const annual: { [key: string]: { [year: string]: number } } = {}
  const cumulative: { [key: string]: { [year: string]: number } } = {}

  // Process data rows (skip header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 4) continue

    const deviceType = row[1]?.trim() // Device Type is in column 1
    if (!deviceType || deviceType === "Error" || deviceType === "") continue

    annual[deviceType] = {}

    // Extract annual values for each year
    validYears.forEach((year, yearIndex) => {
      const columnIndex = 4 + yearIndex // Years start at column 4
      const value = Number.parseInt(row[columnIndex]) || 0
      annual[deviceType][year] = value
    })
  }

  // For cumulative data, we need to look for the second set of columns
  // Based on the structure, cumulative data might be in later columns
  // Let's check if there are more columns after the "Total # of counts" column

  const categories = Object.keys(annual)
  console.log("📋 Found categories:", categories.slice(0, 10), `... (${categories.length} total)`)

  // For now, let's calculate cumulative from annual data
  Object.keys(annual).forEach((category) => {
    cumulative[category] = {}
    let runningTotal = 0
    validYears.forEach((year) => {
      runningTotal += annual[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual,
    cumulative,
    categories,
    years: validYears,
  }
}

export async function fetchDomainData(): Promise<ProcessedData> {
  console.log("🔍 Fetching Domain data from:", DATA_SOURCES.domain)
  const data = await fetchCSV(DATA_SOURCES.domain)

  console.log("📊 Raw Domain data structure:")
  console.log("First row:", data[0])
  console.log("Second row:", data[1])

  const headerRow = data[0]
  const yearColumns = headerRow.slice(4, 26)
  const validYears = yearColumns.filter((year) => year && /^\d{4}$/.test(year))

  const annual: { [key: string]: { [year: string]: number } } = {}
  const cumulative: { [key: string]: { [year: string]: number } } = {}

  // Process data rows (skip header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 4) continue

    const domain = row[3]?.trim() // Domain appears to be in column 3 based on debug output
    if (!domain || domain === "Error" || domain === "") continue

    annual[domain] = {}

    validYears.forEach((year, yearIndex) => {
      const columnIndex = 4 + yearIndex
      const value = Number.parseInt(row[columnIndex]) || 0
      annual[domain][year] = value
    })
  }

  // Calculate cumulative
  const categories = Object.keys(annual)
  Object.keys(annual).forEach((category) => {
    cumulative[category] = {}
    let runningTotal = 0
    validYears.forEach((year) => {
      runningTotal += annual[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual,
    cumulative,
    categories,
    years: validYears,
  }
}

export async function fetchModalityData(): Promise<ProcessedData> {
  console.log("🔍 Fetching Modality data from:", DATA_SOURCES.modality)
  const data = await fetchCSV(DATA_SOURCES.modality)

  const headerRow = data[0]
  const yearColumns = headerRow.slice(4, 26)
  const validYears = yearColumns.filter((year) => year && /^\d{4}$/.test(year))

  const annual: { [key: string]: { [year: string]: number } } = {}
  const cumulative: { [key: string]: { [year: string]: number } } = {}

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 4) continue

    const modality = row[3]?.trim() // Modality in column 3
    if (!modality || modality === "Error" || modality === "") continue

    annual[modality] = {}

    validYears.forEach((year, yearIndex) => {
      const columnIndex = 4 + yearIndex
      const value = Number.parseInt(row[columnIndex]) || 0
      annual[modality][year] = value
    })
  }

  const categories = Object.keys(annual)
  Object.keys(annual).forEach((category) => {
    cumulative[category] = {}
    let runningTotal = 0
    validYears.forEach((year) => {
      runningTotal += annual[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual,
    cumulative,
    categories,
    years: validYears,
  }
}

export async function fetchTaskData(): Promise<ProcessedData> {
  console.log("🔍 Fetching Task data from:", DATA_SOURCES.task)
  const data = await fetchCSV(DATA_SOURCES.task)

  const headerRow = data[0]
  const yearColumns = headerRow.slice(4, 26)
  const validYears = yearColumns.filter((year) => year && /^\d{4}$/.test(year))

  const annual: { [key: string]: { [year: string]: number } } = {}
  const cumulative: { [key: string]: { [year: string]: number } } = {}

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 4) continue

    const task = row[3]?.trim() // Task in column 3
    if (!task || task === "Error" || task === "") continue

    annual[task] = {}

    validYears.forEach((year, yearIndex) => {
      const columnIndex = 4 + yearIndex
      const value = Number.parseInt(row[columnIndex]) || 0
      annual[task][year] = value
    })
  }

  const categories = Object.keys(annual)
  Object.keys(annual).forEach((category) => {
    cumulative[category] = {}
    let runningTotal = 0
    validYears.forEach((year) => {
      runningTotal += annual[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual,
    cumulative,
    categories,
    years: validYears,
  }
}
