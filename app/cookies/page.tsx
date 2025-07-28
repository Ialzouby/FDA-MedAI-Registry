import React from "react"
import Link from "next/link"

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Cookie Policy
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
                  Covenant Intelligence Group ("we," "our," or "us") uses cookies and similar technologies on the 
                  FDA Medical Device Analytics Dashboard (the "Service"). This Cookie Policy explains what cookies are, 
                  how we use them, and your choices regarding their use.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  By using our Service, you consent to the use of cookies in accordance with this policy. 
                  You can manage your cookie preferences at any time through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  2. What Are Cookies?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) 
                  when you visit a website. They help websites remember information about your visit, such as your 
                  preferred language and other settings, which can make your next visit easier and more useful.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cookies can be set by the website you are visiting (first-party cookies) or by third-party services 
                  that the website uses (third-party cookies).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  3. Types of Cookies We Use
                </h2>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  3.1 Essential Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These cookies are necessary for the Service to function properly. They enable basic functions like 
                  page navigation, access to secure areas, and form submissions. The Service cannot function properly 
                  without these cookies.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Examples:</strong> Session management, security tokens, user authentication
                  </p>
                </div>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  3.2 Performance and Analytics Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Currently, we do not use performance or analytics cookies. If we implement analytics services 
                  in the future, we will update this policy accordingly and provide appropriate consent mechanisms.
                </p>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  3.3 Functionality Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These cookies allow the Service to remember choices you make and provide enhanced, more personal features. 
                  They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Examples:</strong> Language preferences, theme settings, user interface customization
                  </p>
                </div>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  3.4 Marketing and Advertising Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Currently, we do not use marketing or advertising cookies. If we implement advertising services 
                  in the future, we will update this policy accordingly and provide appropriate consent mechanisms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  4. Specific Cookies We Use
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                          Cookie Name
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                          Purpose
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                          Duration
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                          sidebar:state
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                          Remembers sidebar open/closed state for better user experience
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                          7 days
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                          Functionality
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Our Service also uses localStorage to store theme preferences (light/dark mode). 
                    This is not a cookie but a browser storage mechanism that helps personalize your experience.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  5. Third-Party Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our Service may use third-party services that set their own cookies. These services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Cloudflare:</strong> For security, performance monitoring, and content delivery</li>
                  <li><strong>Google Fonts:</strong> For typography and font loading</li>
                  <li><strong>Content Delivery Networks:</strong> For faster content delivery</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  These third-party services have their own privacy policies and cookie policies. We encourage you to 
                  review their policies to understand how they use cookies and your data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  6. Managing Your Cookie Preferences
                </h2>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  6.1 Browser Settings
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. You can:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>View and delete existing cookies</li>
                  <li>Block cookies from being set</li>
                  <li>Set preferences for different types of cookies</li>
                  <li>Clear cookies when you close your browser</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  6.2 Opt-Out Options
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You can opt out of certain types of cookies:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Third-party services:</strong> Use browser extensions or privacy tools to block third-party cookies</li>
                  <li><strong>Content delivery networks:</strong> Some CDN services may set cookies for performance optimization</li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> Disabling certain cookies may affect the functionality of our Service. 
                    Essential cookies cannot be disabled as they are necessary for the Service to work properly.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  7. Cookie Consent
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Currently, we do not implement a cookie consent banner as we only use essential functionality cookies 
                  that are necessary for the Service to work properly. If we implement additional cookies in the future, 
                  we will add appropriate consent mechanisms.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  You can manage cookies through your browser settings at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  8. Data Protection and Privacy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The information collected through cookies is used in accordance with our Privacy Policy. 
                  We are committed to protecting your privacy and ensuring that your personal information is 
                  handled securely and in compliance with applicable data protection laws.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  For more information about how we handle your personal information, please refer to our 
                  <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  9. Updates to This Cookie Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this Cookie Policy from time to time to reflect changes in our practices, 
                  technology, legal requirements, or other factors. We will notify you of any material changes 
                  by posting the updated policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  10. Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about this Cookie Policy or our use of cookies, please contact us:
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
                  11. Legal Compliance
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This Cookie Policy is designed to comply with applicable privacy laws and regulations, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                  <li>General Data Protection Regulation (GDPR) - European Union</li>
                  <li>California Consumer Privacy Act (CCPA) - California, USA</li>
                  <li>ePrivacy Directive - European Union</li>
                  <li>Other applicable privacy and data protection laws</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  If you are located in a jurisdiction with specific cookie consent requirements, 
                  we will ensure compliance with those requirements.
                </p>
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