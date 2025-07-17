import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-3 text-2xl font-bold">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-sm">ℹ️</span>
            </div>
            About the Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
            <p className="mb-4">
              The FDA Medical Device Analytics Dashboard is a comprehensive platform designed to provide researchers, healthcare professionals, and industry stakeholders with accessible insights into the rapidly evolving landscape of AI/ML-enabled medical devices approved by the FDA.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">What We Do</h2>
            <p className="mb-4">
              Our platform aggregates and analyzes publicly available FDA data to offer:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Real-time analytics on AI/ML medical device approvals</li>
              <li>Trend analysis across medical specialties and device types</li>
              <li>Advanced filtering and search capabilities</li>
              <li>Interactive visualizations and data exploration tools</li>
              <li>AI-powered insights and device comparisons</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">The Team</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Covenant Intelligence Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Leading the development of intelligent healthcare analytics platforms
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Healthcare AI</Badge>
                  <Badge variant="secondary" className="text-xs">Data Analytics</Badge>
                  <Badge variant="secondary" className="text-xs">Medical Devices</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">FACT Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Research partner specializing in medical AI validation and clinical applications
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Research</Badge>
                  <Badge variant="secondary" className="text-xs">Validation</Badge>
                  <Badge variant="secondary" className="text-xs">Clinical AI</Badge>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Sources</h2>
            <p className="mb-4">
              Our dashboard utilizes data from the official FDA database of AI/ML-enabled medical devices. We maintain direct links to source documentation and ensure transparency in our data processing methods.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Research & Publications</h2>
            <p className="mb-4">
              Our team actively contributes to the medical AI research community through publications, conference presentations, and collaborative studies. We believe in open science and the responsible development of AI technologies in healthcare.
            </p>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Get Involved</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Interested in collaborating or learning more about our research? We welcome partnerships with academic institutions, healthcare organizations, and industry leaders.
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Contact:</strong> For inquiries about research collaborations, data access, or technical support, please reach out through our official channels.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 