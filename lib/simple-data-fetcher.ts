export async function testFetchRawData(url: string) {
  console.log("🔍 Fetching from:", url)

  try {
    const response = await fetch(url)
    console.log("📊 Response status:", response.status)
    console.log("📊 Response ok:", response.ok)
    console.log("📊 Response headers:", Object.fromEntries(response.headers.entries()))

    const text = await response.text()
    console.log("📊 Response length:", text.length)
    console.log("📊 First 1000 characters:", text.substring(0, 1000))

    // Try to parse as CSV manually
    const lines = text.split("\n")
    console.log("📊 Number of lines:", lines.length)
    console.log("📊 First line (headers):", lines[0])
    console.log("📊 Second line (first data):", lines[1])
    console.log("📊 Third line:", lines[2])

    return {
      success: true,
      status: response.status,
      text,
      lines: lines.slice(0, 10), // First 10 lines
      headers: lines[0]?.split(",") || [],
    }
  } catch (error) {
    console.error("❌ Fetch error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
