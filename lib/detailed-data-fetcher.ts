import Papa from "papaparse"

// Correct Google Sheets URL from your screenshot
export const DETAILED_DATA_SOURCE =
  "https://docs.google.com/spreadsheets/d/1HKWFJ9jcyJQqUW8Fm7KAq-WFGjbgfguodgRMmn7xEaE/gviz/tq?tqx=out:csv&gid=123494604"

// Note: I need to construct the proper published URL. Let me use a placeholder for now
// and we'll need to get the actual published URL from the user

export interface DetailedDeviceRecord {
  submissionNumber: string
  dateOfAuthorization: string
  deviceName: string
  deviceDeveloper: string
  validationMethodAI: string
  aiValidationJustification: string
  validationMethodHuman: string
  rctAI: string
  rctHuman: string
  medicalSpecialty: string
  deviceClassification: string
  deviceType: string
  deviceTypeFDAGroup: string
  deviceTypeCategory: string
  domain: string
  domainCode: string
  modality: string
  modalityCode: string
  task: string
  taskCode: string
  deviceFunction: string
  keyCues: string
}

export interface DetailedProcessedData {
  records: DetailedDeviceRecord[]
  totalRecords: number
  years: string[]
  medicalSpecialties: string[]
  deviceTypes: string[]
  domains: string[]
  modalities: string[]
  tasks: string[]
  validationMethods: string[]
}

async function fetchDetailedCSV(url: string): Promise<string[][]> {
  console.log("🔍 Fetching detailed data from:", url)

  const response = await fetch(url)
  console.log("📊 Response status:", response.status)
  console.log("📊 Response headers:", Object.fromEntries(response.headers.entries()))

  const csvText = await response.text()
  console.log("📊 Response length:", csvText.length)
  console.log("📊 First 1000 characters:", csvText.substring(0, 1000))

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      complete: (results) => {
        console.log("📊 Parsed rows:", results.data.length)
        console.log("📊 First row (headers):", results.data[0])
        console.log("📊 Second row (sample data):", results.data[1])
        resolve(results.data as string[][])
      },
      error: (error) => reject(error),
    })
  })
}

export async function fetchDetailedDeviceData(): Promise<DetailedProcessedData> {
  console.log("🔍 Fetching detailed device data from:", DETAILED_DATA_SOURCE)

  const data = await fetchDetailedCSV(DETAILED_DATA_SOURCE)

  console.log("📊 Raw detailed data structure:")
  console.log("First row (headers):", data[0])
  console.log("Second row (sample data):", data[1])
  console.log("Total rows:", data.length)

  const headerRow = data[0]
  const records: DetailedDeviceRecord[] = []

  // Process data rows (skip header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!row || row.length < 10) continue // Skip incomplete rows

    const record: DetailedDeviceRecord = {
      submissionNumber: row[0]?.trim() || "",
      dateOfAuthorization: row[1]?.trim() || "",
      deviceName: row[2]?.trim() || "",
      deviceDeveloper: row[3]?.trim() || "",
      validationMethodAI: row[4]?.trim() || "",
      aiValidationJustification: row[5]?.trim() || "",
      validationMethodHuman: row[6]?.trim() || "",
      rctAI: row[7]?.trim() || "",
      rctHuman: row[8]?.trim() || "",
      medicalSpecialty: row[9]?.trim() || "",
      deviceClassification: row[10]?.trim() || "",
      deviceType: row[11]?.trim() || "",
      deviceTypeFDAGroup: row[12]?.trim() || "",
      deviceTypeCategory: row[13]?.trim() || "",
      domain: row[14]?.trim() || "",
      domainCode: row[15]?.trim() || "",
      modality: row[16]?.trim() || "",
      modalityCode: row[17]?.trim() || "",
      task: row[18]?.trim() || "",
      taskCode: row[19]?.trim() || "",
      deviceFunction: row[20]?.trim() || "",
      keyCues: row[21]?.trim() || "",
    }

    records.push(record)
  }

  // Extract unique values for filtering
  const years = [
    ...new Set(
      records.map((r) => new Date(r.dateOfAuthorization).getFullYear().toString()).filter((y) => !isNaN(Number(y))),
    ),
  ]
  const medicalSpecialties = [...new Set(records.map((r) => r.medicalSpecialty).filter(Boolean))]
  const deviceTypes = [...new Set(records.map((r) => r.deviceType).filter(Boolean))]
  const domains = [...new Set(records.map((r) => r.domain).filter(Boolean))]
  const modalities = [...new Set(records.map((r) => r.modality).filter(Boolean))]
  const tasks = [...new Set(records.map((r) => r.task).filter(Boolean))]
  const validationMethods = [...new Set(records.map((r) => r.validationMethodAI).filter(Boolean))]

  console.log("📋 Processed detailed data:")
  console.log("Total records:", records.length)
  console.log("Years found:", years.sort())
  console.log("Medical specialties:", medicalSpecialties.length)
  console.log("Device types:", deviceTypes.length)

  return {
    records,
    totalRecords: records.length,
    years: years.sort(),
    medicalSpecialties: medicalSpecialties.sort(),
    deviceTypes: deviceTypes.sort(),
    domains: domains.sort(),
    modalities: modalities.sort(),
    tasks: tasks.sort(),
    validationMethods: validationMethods.sort(),
  }
}

// Test function to verify the URL works
export async function testDetailedDataConnection(url: string) {
  try {
    console.log("🧪 Testing detailed data connection:", url)

    const response = await fetch(url)
    const text = await response.text()

    console.log("✅ Connection successful!")
    console.log("📊 Status:", response.status)
    console.log("📊 Content length:", text.length)
    console.log("📊 First 500 chars:", text.substring(0, 500))

    const lines = text.split("\n")
    console.log("📊 Total lines:", lines.length)
    console.log("📊 Headers:", lines[0])

    return {
      success: true,
      status: response.status,
      contentLength: text.length,
      totalLines: lines.length,
      headers: lines[0]?.split(",") || [],
      sampleData: lines.slice(0, 5),
    }
  } catch (error) {
    console.error("❌ Connection failed:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
