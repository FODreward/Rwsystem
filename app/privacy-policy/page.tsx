"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Mail, Phone, MapPin } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Logo Placeholder */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-xs text-gray-500 font-medium">LOGO</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Your privacy and data security are our top priorities</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <p>
                At Survecta, accessible from survecta.com, we are committed to protecting your privacy and ensuring the
                security of your personal information. This Privacy Policy explains how we collect, use, protect, and
                share information when you use our survey platform and reward services.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Information</h3>
            <ul className="space-y-2">
              <li>Name, email address, and contact details</li>
              <li>Account credentials and security PIN</li>
              <li>Profile information and preferences</li>
              <li>Payment and reward redemption details</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Survey Data</h3>
            <ul className="space-y-2">
              <li>Survey responses and participation history</li>
              <li>Demographic information for survey matching</li>
              <li>Completion rates and engagement metrics</li>
              <li>Feedback and quality ratings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Technical Information</h3>
            <ul className="space-y-2">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and platform interactions</li>
              <li>Security logs and fraud prevention data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>

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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security & Protection</h2>
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <p>
                We implement industry-standard security measures including encryption, secure servers, and regular
                security audits. Your survey responses are anonymized and aggregated to protect your identity while
                providing valuable insights to our research partners.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing</h2>
            <p>We do not sell your personal information. We may share anonymized, aggregated data with:</p>
            <ul className="space-y-2 mt-4">
              <li>• Survey sponsors and research partners (anonymized responses only)</li>
              <li>• Service providers who help operate our platform</li>
              <li>• Legal authorities when required by law</li>
              <li>• Business partners for reward fulfillment</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights & Choices</h2>
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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze
              platform usage. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide services. Survey
              responses may be retained longer for research purposes but are anonymized and cannot be linked back to
              you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal
              information from children under 18.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes by email or
              through our platform. Your continued use of our services after changes become effective constitutes
              acceptance of the updated policy.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700">
                    info@survecta.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    123 Survey Street
                    <br />
                    Data City, DC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
