"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Users, Award, Scale, Lock, AlertTriangle, Phone } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms and Conditions</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-6">
            Please read these terms carefully before using Survecta's survey platform and reward services.
          </p>
          <div className="text-sm text-purple-200">Last updated: August 2025</div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "1. Acceptance of Terms", href: "#acceptance" },
              { title: "2. Service Description", href: "#service" },
              { title: "3. Account Registration", href: "#registration" },
              { title: "4. User Conduct", href: "#conduct" },
              { title: "5. Survey Participation", href: "#participation" },
              { title: "6. Rewards System", href: "#rewards" },
              { title: "7. Privacy & Data Protection", href: "#privacy" },
              { title: "8. Intellectual Property", href: "#intellectual" },
              { title: "9. Platform Availability", href: "#availability" },
              { title: "10. Disclaimers", href: "#disclaimers" },
              { title: "11. Limitation of Liability", href: "#liability" },
              { title: "12. Termination", href: "#termination" },
              { title: "13. Governing Law", href: "#law" },
              { title: "14. Contact Information", href: "#contact" },
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

        <div className="space-y-12">
          {/* Section 1 */}
          <section id="acceptance" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Scale className="w-6 h-6 text-purple-600 mr-3" />
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Survecta. These Terms and Conditions ("Terms") constitute a legally binding agreement between
                you and Survecta regarding your use of our survey platform and reward system. By accessing, browsing, or
                using Survecta in any way, you acknowledge that you have read, understood, and agree to be bound by
                these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you do not agree with any part of these Terms, you must not use our services. Your continued use of
                Survecta after any modifications to these Terms constitutes your acceptance of such changes.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <p className="text-purple-800 font-medium">
                  Important: These Terms may be updated periodically. We will notify users of significant changes via
                  email or platform notifications.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="service" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <FileText className="w-6 h-6 text-purple-600 mr-3" />
              2. Service Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Survecta operates as a comprehensive survey platform that connects users with market research
                opportunities while providing a rewarding experience. Our services include:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Core Features:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Access to diverse survey opportunities</li>
                    <li>Real-time reward tracking system</li>
                    <li>Personalized user dashboard</li>
                    <li>Secure payment processing</li>
                    <li>Profile and preference management</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Additional Services:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>24/7 customer support</li>
                    <li>Mobile-responsive platform</li>
                    <li>Data analytics and insights</li>
                    <li>Community features and forums</li>
                    <li>Educational resources</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, enhance, suspend, or discontinue any aspect of our services at any time,
                with or without notice, to improve user experience or comply with legal requirements.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="registration" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Users className="w-6 h-6 text-purple-600 mr-3" />
              3. Account Registration and Eligibility
            </h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-amber-800 font-medium flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Eligibility Requirements
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Basic Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Must be at least 18 years of age</li>
                    <li>Must have legal capacity to enter contracts</li>
                    <li>Must provide accurate, complete information</li>
                    <li>Must have a valid email address</li>
                    <li>One account per person permitted</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Account Responsibilities:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Maintain confidentiality of login credentials</li>
                    <li>Notify us of unauthorized account access</li>
                    <li>Keep profile information current and accurate</li>
                    <li>Comply with all platform rules and guidelines</li>
                    <li>Report suspicious activities promptly</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to verify your identity and eligibility at any time. Accounts found to be in
                violation of these requirements may be suspended or terminated without notice.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="conduct" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Shield className="w-6 h-6 text-purple-600 mr-3" />
              4. User Conduct and Prohibited Activities
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                To maintain a fair and secure environment for all users, you agree to abide by the following conduct
                guidelines:
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                <h4 className="font-semibold text-red-800 mb-2">Strictly Prohibited:</h4>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Creating multiple accounts or using automated systems/bots</li>
                  <li>Providing false, misleading, or fraudulent information</li>
                  <li>Attempting to manipulate or exploit the reward system</li>
                  <li>Sharing account credentials with third parties</li>
                  <li>Engaging in any form of harassment or abusive behavior</li>
                  <li>Violating applicable laws, regulations, or third-party rights</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Survey Conduct:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Provide honest, thoughtful responses</li>
                    <li>Complete surveys in good faith</li>
                    <li>Respect survey time limits and requirements</li>
                    <li>Report technical issues promptly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Platform Usage:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Use services for intended purposes only</li>
                    <li>Respect other users' privacy and rights</li>
                    <li>Follow community guidelines and etiquette</li>
                    <li>Report violations or suspicious activity</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="participation" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Award className="w-6 h-6 text-purple-600 mr-3" />
              5. Survey Participation Guidelines
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Survey participation is the core of our platform. To ensure quality and fairness, the following
                guidelines apply:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Qualification Process:</h4>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Surveys matched based on demographics</li>
                    <li>Pre-screening questions may apply</li>
                    <li>Not all users qualify for every survey</li>
                    <li>Qualification criteria may change</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Completion Requirements:</h4>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Answer all required questions honestly</li>
                    <li>Complete within specified time limits</li>
                    <li>Meet minimum quality standards</li>
                    <li>Submit responses successfully</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-yellow-800">
                  <strong>Quality Assurance:</strong> We employ various methods to verify response quality, including
                  attention checks, consistency validation, and response time analysis. Low-quality or fraudulent
                  responses may result in disqualification and account penalties.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="rewards" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Award className="w-6 h-6 text-purple-600 mr-3" />
              6. Rewards System and Payments
            </h2>
            <div className="prose prose-gray max-w-none">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">Points</div>
                  <p className="text-sm text-purple-700">Earned per completed survey</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-2">Rewards</div>
                  <p className="text-sm text-pink-700">Cash, gift cards, Bitcoin</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">Payouts</div>
                  <p className="text-sm text-indigo-700">Multiple payment methods</p>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">Reward Terms:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Points awarded upon successful survey completion and verification</li>
                <li>Minimum payout thresholds apply (typically $10-25 depending on method)</li>
                <li>Payment processing takes 5-10 business days after request</li>
                <li>Rewards have no cash value outside our platform ecosystem</li>
                <li>Point values and reward options subject to change with notice</li>
                <li>Fraudulent activity results in immediate reward forfeiture</li>
                <li>Unclaimed rewards may expire after 12 months of inactivity</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Tax Responsibility:</strong> Users are solely responsible for any tax obligations related to
                  rewards received. We may issue tax forms as required by law for rewards exceeding certain thresholds.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="privacy" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Lock className="w-6 h-6 text-purple-600 mr-3" />
              7. Privacy and Data Protection
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy and data security are fundamental to our operations. By using Survecta, you acknowledge and
                consent to our data practices as outlined below and in our comprehensive Privacy Policy.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Data We Collect:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Account registration information</li>
                    <li>Survey responses and feedback</li>
                    <li>Platform usage and interaction data</li>
                    <li>Device and technical information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">How We Use Data:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Provide and improve our services</li>
                    <li>Match you with relevant surveys</li>
                    <li>Process rewards and payments</li>
                    <li>Communicate important updates</li>
                    <li>Ensure platform security and integrity</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800">
                  <strong>Data Protection:</strong> We implement industry-standard security measures to protect your
                  personal information. However, no method of transmission over the internet is 100% secure. Please
                  review our Privacy Policy for detailed information about our data handling practices.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="intellectual" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              8. Intellectual Property Rights
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, features, functionality, and materials available through Survecta, including but not
                limited to text, graphics, logos, images, software, and design elements, are owned by Survecta or our
                licensors and are protected by copyright, trademark, patent, and other intellectual property laws.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Our Rights:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Platform design and functionality</li>
                    <li>Survecta brand and trademarks</li>
                    <li>Proprietary algorithms and systems</li>
                    <li>Content and educational materials</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Your Rights:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Limited license to use our platform</li>
                    <li>Ownership of your survey responses</li>
                    <li>Right to delete your account and data</li>
                    <li>Access to your personal information</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Remaining sections with similar enhanced styling... */}
          <section id="availability" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              9. Platform Availability and Maintenance
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to maintain continuous service availability, Survecta may experience downtime for
                maintenance, updates, or unforeseen technical issues. We do not guarantee uninterrupted access to our
                platform.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Scheduled maintenance will be announced in advance when possible</li>
                <li>Emergency maintenance may occur without prior notice</li>
                <li>Service interruptions do not entitle users to compensation</li>
                <li>We reserve the right to modify platform features and functionality</li>
              </ul>
            </div>
          </section>

          <section id="disclaimers" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              10. Disclaimers and Warranties
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Survecta is provided "as is" and "as available" without warranties of any kind, either express or
                implied. We disclaim all warranties including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Uninterrupted, timely, secure, or error-free service</li>
                <li>Accuracy, reliability, or completeness of information</li>
                <li>Security of data transmission or storage</li>
                <li>Availability of surveys or earning opportunities</li>
              </ul>
            </div>
          </section>

          <section id="liability" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              11. Limitation of Liability
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, Survecta shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including but not limited to loss of profits, data, use,
                goodwill, or other intangible losses.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total liability to you for all claims arising from or relating to these Terms or your use of
                Survecta shall not exceed the total amount of rewards earned in your account during the 12 months
                preceding the claim.
              </p>
            </div>
          </section>

          <section id="termination" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              12. Account Termination
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate this agreement at any time. We reserve the right to suspend or terminate your
                account immediately, with or without cause or notice, for violations of these Terms or other reasons we
                deem appropriate.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Upon Termination:</h4>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Your access to Survecta will be immediately revoked</li>
                  <li>Earned but unpaid rewards may be forfeited</li>
                  <li>Your account data will be handled per our Privacy Policy</li>
                  <li>These Terms will remain in effect for applicable provisions</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="law" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              13. Governing Law and Dispute Resolution
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without
                regard to its conflict of law provisions. Any disputes arising from these Terms or your use of Survecta
                shall be resolved through binding arbitration.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You agree to waive your right to participate in class action lawsuits or class-wide arbitration against
                Survecta.
              </p>
            </div>
          </section>

          <section id="contact" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full mr-4"></div>
              <Phone className="w-6 h-6 text-purple-600 mr-3" />
              14. Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or feedback regarding these Terms and Conditions, please don't
                hesitate to contact us:
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg space-y-3">
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Email:</strong>
                  <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700 font-medium">
                    legal@survecta.com
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Support:</strong>
                  <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700 font-medium">
                    support@survecta.com
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Address:</strong>
                  <span>Survecta, Port Harcourt, Nigeria</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <strong className="w-20">Phone:</strong>
                  <span>+234-(Survecta)</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Earning Rewards?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            By creating an account, you agree to these Terms and Conditions. Join thousands of users who are already
            earning rewards through our survey platform.
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
