import React from "react"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Covenant Intelligence Group ("we," "our," or "us") operates the FDA Medical Device Analytics Dashboard 
                  (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you use our Service.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  By using our Service, you agree to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  2. Information We Collect
                </h2>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  2.1 Personal Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Professional credentials and affiliations</li>
                  <li>Communication preferences</li>
                  <li>Feedback and correspondence</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  2.2 Automatically Collected Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When you use our Service, certain information may be automatically processed by our infrastructure and third-party services, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Device information (IP address, browser type, operating system) - processed by Cloudflare for security and performance monitoring</li>
                  <li>Usage data (pages visited, time spent, features used)</li>
                  <li>Analytics data (referral sources, user interactions)</li>
                  <li>Technical logs and error reports</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Note:</strong> While we do not store IP addresses in our own databases, our service providers (such as Cloudflare) may process and temporarily store IP addresses for security, performance monitoring, and fraud prevention purposes. This processing is subject to their respective privacy policies.
                </p>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  2.3 Third-Party Data
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our Service aggregates and analyzes publicly available FDA medical device data. We do not collect, 
                  store, or process personal health information or patient data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>To provide, maintain, and improve our Service</li>
                  <li>To communicate with you about updates, features, and support</li>
                  <li>To analyze usage patterns and optimize user experience</li>
                  <li>To ensure security and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                  <li>To conduct research and development</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our Service, including Cloudflare (for security and performance monitoring) and other infrastructure providers</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal process</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                  <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  5. Data Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational security measures to protect your information against:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Unauthorized access, alteration, or disclosure</li>
                  <li>Data loss or destruction</li>
                  <li>Malicious attacks and security breaches</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  6. Data Retention
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                  unless a longer retention period is required or permitted by law. When we no longer need your information, 
                  we will securely delete or anonymize it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  7. Your Rights and Choices
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Opt out of certain data processing activities</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  8. Third-Party Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our Service uses third-party services that may process your information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Cloudflare:</strong> Provides security, performance monitoring, and content delivery services. Cloudflare may process IP addresses and other technical data for security and performance purposes.</li>
                  <li><strong>Other Infrastructure Providers:</strong> Various cloud and hosting services that support our platform.</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  These third-party services have their own privacy policies and data processing practices. 
                  We recommend reviewing their privacy policies to understand how they handle your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  9. International Data Transfers
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure that such transfers comply with applicable data protection laws and implement 
                  appropriate safeguards to protect your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  10. Children's Privacy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Our Service is not intended for children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  12. Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Covenant Intelligence Group</strong><br />
                    Email: privacy@covintel.org<br />
                    Website: <a href="https://covintel.org" className="text-blue-600 dark:text-blue-400 hover:underline">https://covintel.org</a>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  13. Legal Basis for Processing (EU Users)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For users in the European Union, our legal basis for processing your personal information includes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Consent (where you have given clear consent)</li>
                  <li>Contract performance (to provide our Service)</li>
                  <li>Legitimate interests (to improve and secure our Service)</li>
                  <li>Legal obligations (to comply with applicable laws)</li>
                </ul>
              </section>
            </div>
          </div>

          {/* Back to Dashboard */}
          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 