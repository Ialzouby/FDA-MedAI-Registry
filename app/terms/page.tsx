import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-3 text-2xl font-bold">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-sm">📋</span>
            </div>
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the FDA Medical Device Analytics Dashboard ("the Dashboard"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">2. Purpose and Use</h2>
            <p className="mb-4">
              This dashboard is designed for informational and research purposes only. It provides access to publicly available FDA data regarding AI/ML-enabled medical devices. The dashboard is not intended for clinical decision-making or as a substitute for professional medical advice.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">3. Data Sources and Accuracy</h2>
            <p className="mb-4">
              All data presented in this dashboard is sourced from the official FDA database of AI/ML-enabled medical devices. While we strive to maintain accuracy, we cannot guarantee the completeness or timeliness of the information. Users should verify critical information directly with the FDA.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">4. Medical Disclaimer</h2>
            <p className="mb-4">
              <strong className="text-red-600 dark:text-red-400">IMPORTANT:</strong> This dashboard is for informational purposes only and should not be used for clinical decision-making. Always consult qualified healthcare professionals for medical advice and treatment decisions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              The dashboard interface and analytical tools are proprietary to Covenant Intelligence Group. The underlying FDA data remains in the public domain. Users may not reproduce, distribute, or create derivative works without explicit permission.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">6. Privacy and Data Usage</h2>
            <p className="mb-4">
              We do not collect personal information from users. Analytics data may be collected for service improvement purposes. Please refer to our Privacy Policy for detailed information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              Covenant Intelligence Group shall not be liable for any damages arising from the use of this dashboard, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">8. Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of the dashboard constitutes acceptance of any changes.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">9. Contact Information</h2>
            <p className="mb-4">
              For questions regarding these terms, please contact us through our official channels at Convenient Intelligence Group.
            </p>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 