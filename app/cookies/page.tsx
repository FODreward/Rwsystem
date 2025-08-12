"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cookie, Shield, Settings, Eye, Users, Globe, Smartphone, AlertTriangle, Phone, Clock } from "lucide-react"

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookies Policy</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-6">
            Learn how Survecta uses cookies to enhance your experience and protect your privacy.
          </p>
          <div className="text-sm text-purple-200">Last updated: January 2025</div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "1. What Are Cookies?", href: "#what-are-cookies" },
              { title: "2. How We Use Cookies", href: "#how-we-use-cookies" },
              { title: "3. Types of Cookies We Use", href: "#types-of-cookies" },
              { title: "4. Essential Cookies", href: "#essential-cookies" },
              { title: "5. Performance Cookies", href: "#performance-cookies" },
              { title: "6. Functionality Cookies", href: "#functionality-cookies" },
              { title: "7. Targeting Cookies", href: "#targeting-cookies" },
              { title: "8. Third-Party Cookies", href: "#third-party-cookies" },
              { title: "9. Cookie Duration", href: "#cookie-duration" },
              { title: "10. Managing Your Cookies", href: "#managing-cookies" },
              { title: "11. Browser Settings", href: "#browser-settings" },
              { title: "12. Mobile Devices", href: "#mobile-devices" },
              { title: "13. Consequences of Disabling", href: "#consequences" },
              { title: "14. Policy Updates", href: "#updates" },
              { title: "15. Contact Information", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-purple-600 hover:text-pink-500 transition-colors duration-200 font-medium hover:underline"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section id="what-are-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Cookie className="w-6 h-6 text-purple-600 mr-3" />
              1. What Are Cookies?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer, smartphone, or other device when you
                visit our website. They are widely used to make websites work more efficiently and provide information
                to website owners.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies contain information that is transferred to your device's hard drive. They help us recognize your
                device and store some information about your preferences or past actions on our website.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <p className="text-purple-800 font-medium">
                  Important: Cookies do not contain any information that personally identifies you, but personal
                  information that we store about you may be linked to the information stored in and obtained from
                  cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="how-we-use-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Settings className="w-6 h-6 text-purple-600 mr-3" />
              2. How We Use Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Survecta uses cookies for several important purposes to enhance your experience on our platform:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Core Functions:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Authentication and login sessions</li>
                    <li>User preferences and settings</li>
                    <li>Survey progress tracking</li>
                    <li>Reward system functionality</li>
                    <li>Security and fraud prevention</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Enhancement Features:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Performance optimization</li>
                    <li>Analytics and insights</li>
                    <li>Personalized content delivery</li>
                    <li>Communication preferences</li>
                    <li>Platform improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="types-of-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Globe className="w-6 h-6 text-purple-600 mr-3" />
              3. Types of Cookies We Use
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                We use different types of cookies, each serving specific purposes:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2">Essential Cookies</h4>
                  <p className="text-green-700 text-sm">
                    Required for basic website functionality and cannot be disabled.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">Performance Cookies</h4>
                  <p className="text-blue-700 text-sm">Help us understand how visitors interact with our website.</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-800 mb-2">Functionality Cookies</h4>
                  <p className="text-yellow-700 text-sm">Remember your preferences and provide enhanced features.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-800 mb-2">Targeting Cookies</h4>
                  <p className="text-purple-700 text-sm">Used to deliver relevant content and advertisements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="essential-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              4. Essential Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Essential cookies are necessary for our website to function properly. These cookies enable core
                functionality such as security, network management, and accessibility.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Cookie Name</th>
                      <th className="px-4 py-2 text-left font-semibold">Purpose</th>
                      <th className="px-4 py-2 text-left font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 font-mono text-sm">session_id</td>
                      <td className="px-4 py-2">Maintains your login session</td>
                      <td className="px-4 py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-sm">csrf_token</td>
                      <td className="px-4 py-2">Protects against cross-site request forgery</td>
                      <td className="px-4 py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-sm">cookie_consent</td>
                      <td className="px-4 py-2">Remembers your cookie preferences</td>
                      <td className="px-4 py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="performance-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Eye className="w-6 h-6 text-blue-600 mr-3" />
              5. Performance Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Performance cookies collect information about how you use our website, such as which pages you visit
                most often and if you get error messages from web pages.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Google Analytics cookies to understand user behavior</li>
                <li>Page load time measurement cookies</li>
                <li>Error tracking and debugging cookies</li>
                <li>A/B testing cookies for feature optimization</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-800">
                  <strong>Note:</strong> All information collected by performance cookies is aggregated and anonymous.
                  We cannot identify you personally from this information.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="functionality-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Settings className="w-6 h-6 text-yellow-600 mr-3" />
              6. Functionality Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Functionality cookies allow our website to remember choices you make and provide enhanced, more personal
                features.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-2">User Preferences:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Language selection</li>
                    <li>Theme preferences (dark/light mode)</li>
                    <li>Dashboard layout customizations</li>
                    <li>Notification settings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Survey Features:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Survey progress tracking</li>
                    <li>Saved survey responses</li>
                    <li>Reward preferences</li>
                    <li>Survey category filters</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="targeting-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Users className="w-6 h-6 text-purple-600 mr-3" />
              7. Targeting Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Targeting cookies are used to deliver advertisements and content that are more relevant to you and your
                interests.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Personalized survey recommendations based on your interests</li>
                <li>Relevant reward offers and promotions</li>
                <li>Content customization based on your activity</li>
                <li>Marketing campaign effectiveness measurement</li>
              </ul>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">
                  <strong>Your Control:</strong> You can opt out of targeting cookies at any time through your cookie
                  preferences or browser settings without affecting the core functionality of our platform.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="third-party-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Globe className="w-6 h-6 text-red-600 mr-3" />
              8. Third-Party Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                We work with trusted third-party partners who may place cookies on your device when you visit our
                website.
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Helps us understand website usage and improve user experience.
                  </p>
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-purple-600 hover:text-purple-700 text-sm"
                  >
                    View Google's Privacy Policy →
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Processors</h4>
                  <p className="text-sm text-gray-600 mb-2">Secure payment processing for reward redemptions.</p>
                  <p className="text-sm text-gray-500">Stripe, PayPal, and other payment partners</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Social Media Platforms</h4>
                  <p className="text-sm text-gray-600 mb-2">Social sharing and login functionality.</p>
                  <p className="text-sm text-gray-500">Facebook, Twitter, LinkedIn integration</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="cookie-duration" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Clock className="w-6 h-6 text-indigo-600 mr-3" />
              9. Cookie Duration
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies have different lifespans depending on their purpose:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Session Cookies</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Temporary cookies that are deleted when you close your browser.
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>Login sessions</li>
                    <li>Shopping cart contents</li>
                    <li>Form data</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Persistent Cookies</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Remain on your device for a set period or until manually deleted.
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>User preferences (1 year)</li>
                    <li>Analytics data (2 years)</li>
                    <li>Marketing cookies (30 days)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section id="managing-cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Settings className="w-6 h-6 text-green-600 mr-3" />
              10. Managing Your Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                You have several options for managing cookies on our website:
              </p>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Cookie Preference Center</h4>
                  <p className="text-green-700 text-sm mb-3">
                    Use our built-in cookie management tool to control your preferences.
                  </p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                    Manage Cookie Preferences
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Browser Settings</h4>
                  <p className="text-blue-700 text-sm">Configure cookie settings directly in your web browser.</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Opt-Out Tools</h4>
                  <p className="text-yellow-700 text-sm">Use industry opt-out tools for advertising cookies.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 11 */}
          <section id="browser-settings" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Smartphone className="w-6 h-6 text-blue-600 mr-3" />
              11. Browser Settings
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in
                popular browsers:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold">Google Chrome</h5>
                    <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold">Mozilla Firefox</h5>
                    <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold">Safari</h5>
                    <p className="text-sm text-gray-600">Preferences → Privacy → Cookies</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold">Microsoft Edge</h5>
                    <p className="text-sm text-gray-600">Settings → Cookies and Site Permissions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 12 */}
          <section id="mobile-devices" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Smartphone className="w-6 h-6 text-pink-600 mr-3" />
              12. Mobile Devices
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Managing cookies on mobile devices varies by operating system and browser:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">iOS Devices</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Safari: Settings → Safari → Privacy & Security</li>
                    <li>• Chrome: Chrome app → Settings → Privacy</li>
                    <li>• Firefox: Firefox app → Settings → Privacy</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Android Devices</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Chrome: Chrome app → Settings → Site Settings</li>
                    <li>• Firefox: Firefox app → Settings → Privacy</li>
                    <li>• Samsung Internet: Settings → Privacy</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 13 */}
          <section id="consequences" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
              13. Consequences of Disabling Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                While you can disable cookies, doing so may affect your experience on our platform:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Potential Issues</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Difficulty staying logged in</li>
                    <li>• Loss of personalized settings</li>
                    <li>• Reduced website functionality</li>
                    <li>• Survey progress may not be saved</li>
                    <li>• Reward tracking may be affected</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Still Available</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Basic website browsing</li>
                    <li>• Account creation and login</li>
                    <li>• Survey participation</li>
                    <li>• Customer support access</li>
                    <li>• Core platform features</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 14 */}
          <section id="updates" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Clock className="w-6 h-6 text-indigo-600 mr-3" />
              14. Policy Updates
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons.
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">How We Notify You</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Email notification to registered users</li>
                  <li>• Website banner announcement</li>
                  <li>• Updated "Last Modified" date at the top of this policy</li>
                  <li>• In-app notifications for significant changes</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </div>
          </section>

          {/* Section 15 */}
          <section id="contact" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Phone className="w-6 h-6 text-purple-600 mr-3" />
              15. Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookies Policy, please don't hesitate to
                contact us:
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg space-y-3">
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Email:</strong>
                  <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700 font-medium">
                    info@survecta.com
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Support:</strong>
                  <a href="mailto:info@survecta.com@survecta.com" className="text-purple-600 hover:text-purple-700 font-medium">
                    info@survecta.com
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Address:</strong>
                  <span>Survecta, Port Harcourt,Nigeria</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Phone:</strong>
                  <span>+234 (Survecta)</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Earning Rewards?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            By using our platform, you consent to our use of cookies as described in this policy. Join thousands of
            users who are already earning rewards through our survey platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3">
              <Link href="/signup">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 bg-transparent"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:text-purple-100 hover:bg-white/10">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
