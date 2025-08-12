"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Users, Award } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-gray-400" />
            <span className="sr-only">Survecta Logo</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using Survecta's survey platform and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="prose prose-lg text-gray-700 max-w-none">
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-4">Last updated: January 2025</p>
              <p className="text-lg leading-relaxed">
                Welcome to Survecta. These Terms and Conditions ("Terms") govern your use of our survey platform and
                reward system. By accessing or using Survecta, you agree to be bound by these Terms.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-purple-600 mr-2" />
                Account Registration and Eligibility
              </h2>
              <ul className="space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must provide accurate and complete information during registration</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>One account per person is permitted</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 text-purple-600 mr-2" />
                Survey Participation and Rewards
              </h2>
              <ul className="space-y-2">
                <li>Survey availability depends on your demographic profile and location</li>
                <li>You must provide honest and thoughtful responses to survey questions</li>
                <li>Points are awarded upon successful completion of surveys</li>
                <li>Incomplete or fraudulent survey responses may result in point forfeiture</li>
                <li>Reward redemption is subject to availability and processing times</li>
                <li>We reserve the right to modify point values and reward options</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="space-y-2">
                <li>Create multiple accounts or use automated systems</li>
                <li>Provide false or misleading information in surveys</li>
                <li>Attempt to manipulate or exploit the reward system</li>
                <li>Share your account credentials with others</li>
                <li>Engage in any activity that disrupts our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data and Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our
                Privacy Policy. By using Survecta, you consent to the collection and use of your information as
                described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of Survecta are owned by us and are protected by copyright,
                trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative
                works without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                Survecta provides services "as is" without warranties. We are not liable for any indirect, incidental,
                or consequential damages arising from your use of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
                posting. Your continued use of Survecta constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-purple-600 mr-2" />
                Contact Information
              </h2>
              <p className="mb-4">If you have questions about these Terms, please contact us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Survecta Support</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700">
                    info@survecta.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
