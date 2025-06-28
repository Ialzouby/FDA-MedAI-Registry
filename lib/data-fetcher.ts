import Papa from "papaparse"

// Google Sheets URLs - Updated to use the detailed database
export const DATA_SOURCES = {
  detailedDatabase:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlnJBLSPzj-3w5oqi27JyS3zxVxM83oGKQXcQRlrLBfwtaAsnZTKicorsioKEj2oYPAPIRJpwle4rv/pub?output=csv&gid=123494604",
}

export interface ProcessedData {
  annual: { [key: string]: { [year: string]: number } }
  cumulative: { [key: string]: { [year: string]: number } }
  categories: string[]
  years: string[]
}

async function fetchCSV(url: string): Promise<string[][]> {
  console.log("🌐 Fetching CSV from:", url)
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'text/csv,text/plain,*/*',
      },
    })
    
    if (!response.ok) {
      console.error("❌ HTTP Error:", response.status, response.statusText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const csvText = await response.text()
    console.log("📄 Raw CSV response length:", csvText.length)
    console.log("📄 First 200 characters:", csvText.substring(0, 200))

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        complete: (results: any) => {
          console.log("✅ CSV parsed successfully:", {
            dataLength: results.data.length,
            firstRow: results.data[0],
            secondRow: results.data[1]
          })
          resolve(results.data as string[][])
        },
        error: (error: any) => {
          console.error("❌ CSV parsing error:", error)
          reject(error)
        },
      })
    })
  } catch (error) {
    console.error("❌ Fetch error:", error)
    throw error
  }
}

export async function fetchDeviceTypeData(): Promise<ProcessedData> {
  console.log("🔍 Fetching detailed database to process Device Type data")
  const data = await fetchCSV(DATA_SOURCES.detailedDatabase)

  // Process the detailed database to create device type summary
  const deviceTypeCounts: { [key: string]: { [year: string]: number } } = {}
  const years = new Set<string>()

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 13) continue

    const deviceType = row[11]?.trim() // Device type is in column L (index 11)
    const dateStr = row[1]?.trim() // Date is in column B (index 1)
    
    if (!deviceType || deviceType === "" || !dateStr) continue

    // Extract year from date
    const year = new Date(dateStr).getFullYear().toString()
    years.add(year)

    if (!deviceTypeCounts[deviceType]) {
      deviceTypeCounts[deviceType] = {}
    }
    
    deviceTypeCounts[deviceType][year] = (deviceTypeCounts[deviceType][year] || 0) + 1
  }

  const sortedYears = Array.from(years).sort()
  const categories = Object.keys(deviceTypeCounts).sort()

  // Calculate cumulative data
  const cumulative: { [key: string]: { [year: string]: number } } = {}
  categories.forEach(category => {
    cumulative[category] = {}
    let runningTotal = 0
    sortedYears.forEach(year => {
      runningTotal += deviceTypeCounts[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual: deviceTypeCounts,
    cumulative,
    categories,
    years: sortedYears,
  }
}

export async function fetchDomainData(): Promise<ProcessedData> {
  console.log("🔍 Fetching detailed database to process Domain data")
  const data = await fetchCSV(DATA_SOURCES.detailedDatabase)

  // Process the detailed database to create domain summary
  const domainCounts: { [key: string]: { [year: string]: number } } = {}
  const years = new Set<string>()

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 16) continue

    const domain = row[14]?.trim() // Domain is in column O (index 14)
    const dateStr = row[1]?.trim() // Date is in column B (index 1)
    
    if (!domain || domain === "" || !dateStr) continue

    // Extract year from date
    const year = new Date(dateStr).getFullYear().toString()
    years.add(year)

    if (!domainCounts[domain]) {
      domainCounts[domain] = {}
    }
    
    domainCounts[domain][year] = (domainCounts[domain][year] || 0) + 1
  }

  const sortedYears = Array.from(years).sort()
  const categories = Object.keys(domainCounts).sort()

  // Calculate cumulative data
  const cumulative: { [key: string]: { [year: string]: number } } = {}
  categories.forEach(category => {
    cumulative[category] = {}
    let runningTotal = 0
    sortedYears.forEach(year => {
      runningTotal += domainCounts[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual: domainCounts,
    cumulative,
    categories,
    years: sortedYears,
  }
}

export async function fetchModalityData(): Promise<ProcessedData> {
  console.log("🔍 Fetching detailed database to process Modality data")
  const data = await fetchCSV(DATA_SOURCES.detailedDatabase)

  // Process the detailed database to create modality summary
  const modalityCounts: { [key: string]: { [year: string]: number } } = {}
  const years = new Set<string>()

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 18) continue

    const modality = row[16]?.trim() // Modality is in column Q (index 16)
    const dateStr = row[1]?.trim() // Date is in column B (index 1)
    
    if (!modality || modality === "" || !dateStr) continue

    // Extract year from date
    const year = new Date(dateStr).getFullYear().toString()
    years.add(year)

    if (!modalityCounts[modality]) {
      modalityCounts[modality] = {}
    }
    
    modalityCounts[modality][year] = (modalityCounts[modality][year] || 0) + 1
  }

  const sortedYears = Array.from(years).sort()
  const categories = Object.keys(modalityCounts).sort()

  // Calculate cumulative data
  const cumulative: { [key: string]: { [year: string]: number } } = {}
  categories.forEach(category => {
    cumulative[category] = {}
    let runningTotal = 0
    sortedYears.forEach(year => {
      runningTotal += modalityCounts[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual: modalityCounts,
    cumulative,
    categories,
    years: sortedYears,
  }
}

export async function fetchTaskData(): Promise<ProcessedData> {
  console.log("🔍 Fetching detailed database to process Task data")
  const data = await fetchCSV(DATA_SOURCES.detailedDatabase)

  // Process the detailed database to create task summary
  const taskCounts: { [key: string]: { [year: string]: number } } = {}
  const years = new Set<string>()

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 20) continue

    const task = row[18]?.trim() // Task is in column S (index 18)
    const dateStr = row[1]?.trim() // Date is in column B (index 1)
    
    if (!task || task === "" || !dateStr) continue

    // Extract year from date
    const year = new Date(dateStr).getFullYear().toString()
    years.add(year)

    if (!taskCounts[task]) {
      taskCounts[task] = {}
    }
    
    taskCounts[task][year] = (taskCounts[task][year] || 0) + 1
  }

  const sortedYears = Array.from(years).sort()
  const categories = Object.keys(taskCounts).sort()

  // Calculate cumulative data
  const cumulative: { [key: string]: { [year: string]: number } } = {}
  categories.forEach(category => {
    cumulative[category] = {}
    let runningTotal = 0
    sortedYears.forEach(year => {
      runningTotal += taskCounts[category][year] || 0
      cumulative[category][year] = runningTotal
    })
  })

  return {
    annual: taskCounts,
    cumulative,
    categories,
    years: sortedYears,
  }
}
