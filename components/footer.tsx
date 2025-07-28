import React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-12 py-10 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">FDA Medical Device Analytics Dashboard</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Comprehensive analytics platform for FDA AI/ML-enabled medical device data.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="https://factgroup.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                Covenent Intelligence Group
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://www.fda.gov/medical-devices/device-approvals-denials-and-clearances/ai-and-machine-learning-enabled-medical-devices" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                FDA Database
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="https://covintel.org/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://covintel.org/research" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-red-600 dark:text-red-400 font-semibold text-sm">⚠️ Medical Disclaimer:</span>
            <p className="text-sm text-red-800 dark:text-red-200">
              This dashboard is for informational and research purposes only. It is not intended for clinical decision-making or as a substitute for professional medical advice.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Covenant Intelligence Group. All rights reserved.
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Powered by Covenant Intelligence Group
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 