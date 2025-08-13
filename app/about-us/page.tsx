"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-4">
                <img src="/Surve1.png" alt="Survecta Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">About Survecta</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your most trusted survey platform for earning real rewards through legitimate market research
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Mission Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className="mb-8">
              <img
                src="/about-us.png"
                alt="Survecta mission - helping people achieve success through surveys and rewards"
                className="w-full h-64 object-cover rounded-xl shadow-sm"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  At Survecta, we bridge the gap between businesses seeking valuable consumer insights and individuals
                  looking to earn meaningful rewards for their opinions. Our mission is to create the most trusted,
                  transparent, and rewarding survey platform where your voice truly matters and your time is fairly
                  compensated.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  We believe that market research should be a mutually beneficial relationship. Companies get the
                  authentic feedback they need to improve their products and services, while our members earn real
                  rewards for sharing their honest opinions and experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Survecta Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Survecta?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/about-us1.png"
                  alt="Trust and security - shield and lock symbols showing data protection"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Trusted by Thousands</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Since our founding, we've built a reputation as one of the most reliable survey platforms in the
                  industry. Our members trust us because we deliver on our promises - fair compensation, timely
                  payments, and complete transparency in all our operations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We partner only with legitimate market research companies and brands, ensuring that every survey you
                  complete contributes to real business decisions and product improvements.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/about-us2.png"
                  alt="Earnings and rewards - money, coins, and gift cards showing financial benefits"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Rewards, Real Value</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We offer competitive compensation for your time and opinions. Our point system is straightforward and
                  fair, with multiple redemption options including popular gift cards, PayPal cash, and even
                  cryptocurrency like Bitcoin.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  No hidden fees, no minimum thresholds that are impossible to reach, and no expired points. Your
                  earnings are yours to keep and redeem whenever you're ready.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Founded in 2025, Survecta emerged from a simple observation: the market research industry needed a
                  platform that truly valued participants' time and opinions. Our founders, experienced in both
                  technology and market research, recognized the gap between what survey participants deserved and what
                  they were receiving.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We started with a commitment to transparency, fair compensation, and user experience. Unlike other
                  platforms that treat participants as just numbers, we built Survecta to be a community where every
                  member's contribution is valued and rewarded appropriately.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, we're proud to be one of the fastest-growing survey platforms, connecting thousands of members
                  with meaningful earning opportunities while providing businesses with the authentic insights they need
                  to succeed.
                </p>
              </div>
              <div>
                <img
                  src="/about-us3.png"
                  alt="Company story - professional team collaboration and platform development"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* How Survecta Works Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Survecta Works</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">1. Sign Up & Profile</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Create your free account and complete your profile. This helps us match you with surveys that are
                  relevant to your demographics and interests, ensuring better earning opportunities.
                </p>
              </div>
              <div className="text-center bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">2. Take Surveys</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Browse available surveys in your dashboard and choose ones that interest you. Each survey shows the
                  estimated time and point reward upfront, so you know exactly what to expect.
                </p>
              </div>
              <div className="text-center bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">3. Earn & Redeem</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Earn points for each completed survey and redeem them for gift cards, PayPal cash, or cryptocurrency.
                  Fast processing and multiple payout options make it easy to access your earnings.
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Commitment to You</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.586-3.586a2 2 0 00-2.828 0l-3 3a2 2 0 002.828 2.828l.586-.586.586.586a2 2 0 002.828-2.828l-3-3z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Data Security & Privacy</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Your personal information and survey responses are protected with bank-level encryption and security
                  measures. We never sell your personal data to third parties.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All survey data is anonymized and aggregated before being shared with research partners, ensuring your
                  privacy is always maintained.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Fair & Transparent Rewards</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Every survey shows the exact point value and estimated completion time before you start. No surprises,
                  no hidden conditions, no points that expire.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We regularly review our compensation rates to ensure they remain competitive and fair for the time you
                  invest.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Quality Survey Experience</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  We carefully vet all survey partners to ensure high-quality, relevant surveys that respect your time
                  and provide meaningful earning opportunities.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our platform is designed to minimize technical issues and provide a smooth, user-friendly
                  survey-taking experience.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Responsive Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Our dedicated support team is here to help with any questions or issues you may encounter. We pride
                  ourselves on quick response times and helpful solutions.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Whether you need help with technical issues, payment questions, or survey problems, we're committed to
                  resolving your concerns promptly.
                </p>
              </div>
            </div>
          </div>

          {/* What Makes Us Different Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Makes Us Different</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Member-First Approach</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">No spam emails or excessive notifications</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Clear, honest communication about opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Regular platform improvements based on user feedback</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Flexible earning options that fit your schedule</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Leadership</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Partnerships with Fortune 500 companies</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Advanced matching algorithms for better survey fit</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Mobile-optimized platform for earning on-the-go</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Continuous innovation in reward and earning options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Team</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Behind Survecta is a dedicated team of professionals with extensive experience in market research,
              technology, and customer service. We're united by our commitment to creating the best possible experience
              for our members while maintaining the highest standards of data quality for our research partners.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="/about-us4.png"
                  alt="Leadership team member - experienced professional from market research sector"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900">Leadership Team</h3>
                <p className="text-gray-600 text-sm">
                  Experienced professionals from market research and technology sectors, committed to your success and
                  platform excellence
                </p>
              </div>
              <div className="text-center">
                <img
                  src="/about-us5.png"
                  alt="Development team member - skilled developer building innovative solutions"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900">Development Team</h3>
                <p className="text-gray-600 text-sm">
                  Skilled developers and designers building innovative solutions for seamless survey experiences and
                  platform reliability
                </p>
              </div>
              <div className="text-center">
                <img
                  src="/about-us6.png"
                  alt="Support team member - dedicated customer service specialist"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900">Support Team</h3>
                <p className="text-gray-600 text-sm">
                  Dedicated customer service specialists providing prompt, helpful assistance for all your questions and
                  concerns
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Have questions about surveys, payments, or your account? Our support team is here to help you
                    succeed on the Survecta platform.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-purple-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a href="mailto:info@survecta.com" className="text-purple-600 hover:text-purple-700 font-medium">
                        info@survecta.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-purple-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-700">Response time: Within 24 hours</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• How do I qualify for more surveys?</li>
                    <li>• When will I receive my payment?</li>
                    <li>• How do I update my profile information?</li>
                    <li>• What should I do if a survey doesn't work?</li>
                    <li>• How can I maximize my earnings?</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-4">
                    For detailed answers to these and other questions, visit our Help Center or contact us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h3>
          <p className="text-white/90 mb-6">Join thousands of satisfied members earning real rewards with Survecta</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/signup">Start Earning Today</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Link href="/login">Member Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
