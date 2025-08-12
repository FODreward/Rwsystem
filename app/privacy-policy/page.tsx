"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Eye,
  Lock,
  Users,
  FileText,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Database,
  UserCheck,
  Scale,
} from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-purple-100 mb-2">Your privacy and data security are our top priorities</p>
          <p className="text-purple-200">Last updated: August 10, 2025</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="w-6 h-6 text-purple-600 mr-3" />
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Introduction & Overview",
              "Information We Collect",
              "How We Use Your Data",
              "Data Security & Protection",
              "Information Sharing",
              "Your Rights & Choices",
              "Cookies & Tracking",
              "Data Retention Policies",
              "International Transfers",
              "Third-Party Services",
              "GDPR & CCPA Compliance",
              "Children's Privacy",
              "Policy Updates",
              "Contact Information",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Introduction & Overview</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                At Survecta, accessible from survecta.com, we are committed to protecting your privacy and ensuring the
                security of your personal information. This Privacy Policy explains how we collect, use, protect, and
                share information when you use our survey platform and reward services. We believe in transparency and
                want you to understand exactly how your data is handled.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Privacy Commitment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> We never sell your personal information
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Your survey responses are anonymized
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Industry-standard security measures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Full transparency in data usage
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                    Account Information
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Full name and contact details</li>
                    <li>• Email address and phone number</li>
                    <li>• Account credentials and security PIN</li>
                    <li>• Profile information and preferences</li>
                    <li>• Payment and reward redemption details</li>
                    <li>• Account verification documents</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    Survey & Research Data
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Survey responses and participation history</li>
                    <li>• Demographic information for matching</li>
                    <li>• Completion rates and engagement metrics</li>
                    <li>• Quality ratings and feedback</li>
                    <li>• Survey preferences and interests</li>
                    <li>• Time spent on surveys</li>
                    <li>• Response patterns and behavior</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Settings className="w-5 h-5 text-purple-600 mr-2" />
                    Technical Information
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Device information and browser type</li>
                    <li>• IP address and approximate location</li>
                    <li>• Usage patterns and platform interactions</li>
                    <li>• Security logs and fraud prevention data</li>
                    <li>• Session duration and activity</li>
                    <li>• Error logs and performance metrics</li>
                    <li>• Referral sources and navigation paths</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Globe className="w-5 h-5 text-orange-600 mr-2" />
                    Behavioral Data
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Platform usage patterns</li>
                    <li>• Feature interaction data</li>
                    <li>• Survey completion behavior</li>
                    <li>• Reward redemption patterns</li>
                    <li>• Communication engagement</li>
                    <li>• Support interaction history</li>
                    <li>• Platform feedback and ratings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Platform Services</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Match you with relevant surveys</li>
                  <li>• Process reward payments</li>
                  <li>• Provide customer support</li>
                  <li>• Maintain account security</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Platform Improvement</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Enhance user experience</li>
                  <li>• Develop new features</li>
                  <li>• Analyze platform performance</li>
                  <li>• Prevent fraud and abuse</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security & Protection */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Data Security & Protection</h2>
            </div>
            <p>
              We implement industry-standard security measures including encryption, secure servers, and regular
              security audits. Your survey responses are anonymized and aggregated to protect your identity while
              providing valuable insights to our research partners.
            </p>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Information Sharing</h2>
            </div>
            <p>We do not sell your personal information. We may share anonymized, aggregated data with:</p>
            <ul className="space-y-2 mt-4">
              <li>• Survey sponsors and research partners (anonymized responses only)</li>
              <li>• Service providers who help operate our platform</li>
              <li>• Legal authorities when required by law</li>
              <li>• Business partners for reward fulfillment</li>
            </ul>
          </div>

          {/* Your Rights & Choices */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Your Rights & Choices</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Access & Control</h3>
                <ul className="space-y-2 text-sm">
                  <li>• View and update your profile</li>
                  <li>• Download your data</li>
                  <li>• Delete your account</li>
                  <li>• Opt out of communications</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Privacy Settings</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Control survey matching</li>
                  <li>• Manage data sharing preferences</li>
                  <li>• Set communication preferences</li>
                  <li>• Review privacy settings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookies & Tracking */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Cookies & Tracking</h2>
            </div>
            <p>
              We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze
              platform usage. You can control cookie settings through your browser preferences.
            </p>
          </div>

          {/* Data Retention Policies */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Data Retention Policies</h2>
            </div>
            <p>
              We retain your information for as long as your account is active or as needed to provide services. Survey
              responses may be retained longer for research purposes but are anonymized and cannot be linked back to
              you.
            </p>
          </div>

          {/* International Transfers */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">International Transfers</h2>
            </div>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Third-Party Services</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics & Performance</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Google Analytics (usage tracking)</li>
                    <li>• Hotjar (user experience analysis)</li>
                    <li>• New Relic (performance monitoring)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Processing</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Stripe (payment processing)</li>
                    <li>• PayPal (alternative payments)</li>
                    <li>• Wise (international transfers)</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• SendGrid (email delivery)</li>
                    <li>• Twilio (SMS notifications)</li>
                    <li>• Intercom (customer support)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Security & Fraud Prevention</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• reCAPTCHA (bot protection)</li>
                    <li>• Cloudflare (DDoS protection)</li>
                    <li>• MaxMind (fraud detection)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* GDPR & CCPA Compliance */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">GDPR & CCPA Compliance</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">GDPR Rights (EU Residents)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Access:</strong> Request copies of your personal data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Rectification:</strong> Correct inaccurate information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Erasure:</strong> Request deletion of your data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Portability:</strong> Transfer data to another service
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Object:</strong> Opt out of certain data processing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">CCPA Rights (California Residents)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Know:</strong> What personal information we collect
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Delete:</strong> Request deletion of personal information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Right to Opt-Out:</strong> Opt out of sale of personal information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Non-Discrimination:</strong> Equal service regardless of privacy choices
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <p className="text-gray-700">
                <strong>Exercise Your Rights:</strong> To exercise any of these rights, please contact us at
                <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700 ml-1">
                  privacy@survecta.com
                </a>
                . We will respond to your request within 30 days as required by law.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Children's Privacy</h2>
            </div>
            <p>
              Our services are not directed to individuals under the legal age of majority in their country of residence (which is typically 18 years old, but may vary). We do not knowingly collect personal information from anyone under this age.
            </p>
          </div>

          {/* Policy Updates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Policy Updates</h2>
            </div>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes by email or
              through our platform. Your continued use of our services after changes become effective constitutes
              acceptance of the updated policy.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Mail className="w-8 h-8 mr-3" />
              Contact Our Privacy Team
            </h2>
            <p className="text-purple-100 mb-8 text-lg">
              Have questions about this Privacy Policy, want to exercise your rights, or need help with data-related
              concerns? Our dedicated privacy team is here to help.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Privacy Email</h3>
                <a href="mailto:info@survecta.com" className="text-purple-200 hover:text-white transition-colors">
                  privacy@survecta.com
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Privacy Hotline</h3>
                <p className="text-purple-200">+234 Survecta</p>
                <p className="text-xs text-purple-300">Mon-Fri, 9AM-6PM EST</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Mailing Address</h3>
                <p className="text-purple-200 text-sm">
                  Privacy Officer
                  <br />
                  Survecta
                  <br />
                  Nigeria
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-purple-200 text-sm">
                  Standard: 5 business days
                  <br />
                  Urgent: 24-48 hours
                  <br />
                  Legal: 30 days max
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-purple-600 hover:bg-purple-50">
                <Link href="/signup">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
