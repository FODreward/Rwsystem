import { ArrowLeft, HelpCircle, Users, Gift, Shield, Settings, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function FAQPage() {
  const faqSections = [
    {
      title: "Getting Started",
      icon: Users,
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Creating an account is simple! Click the 'Sign Up' button on our homepage, fill in your basic information including name, email, and password. You'll receive a verification email to confirm your account. Once verified, you can start participating in surveys immediately.",
        },
        {
          question: "Is Survecta free to use?",
          answer:
            "Yes, Survecta is completely free to join and use. There are no membership fees, subscription costs, or hidden charges. You earn rewards by participating in surveys, and we never charge you for accessing our platform.",
        },
        {
          question: "What information do I need to provide during registration?",
          answer:
            "We only require basic information: your name, email address, and a secure password. Optional demographic information helps us match you with more relevant surveys, but it's not mandatory for registration.",
        },
        {
          question: "How do I verify my email address?",
          answer:
            "After registration, check your email inbox for a verification message from Survecta. Click the verification link in the email to activate your account. If you don't see the email, check your spam folder or request a new verification email from your account settings.",
        },
      ],
    },
    {
      title: "Surveys & Participation",
      icon: MessageCircle,
      questions: [
        {
          question: "How do surveys work?",
          answer:
            "Once logged in, you'll see available surveys on your dashboard. Each survey shows the estimated completion time, reward amount, and topic. Click to start a survey, answer all questions honestly, and submit to earn your reward. Surveys cover various topics from consumer preferences to market research.",
        },
        {
          question: "How long do surveys typically take?",
          answer:
            "Survey length varies depending on the topic and complexity. Most surveys take between 5-20 minutes to complete. The estimated time is always displayed before you start, so you can choose surveys that fit your available time.",
        },
        {
          question: "What happens if I don't qualify for a survey?",
          answer:
            "Sometimes surveys have specific demographic requirements. If you don't qualify, you'll be notified early in the process and may receive a small consolation reward for your time. Don't worry - there are always more surveys available that match your profile.",
        },
        {
          question: "Can I pause a survey and continue later?",
          answer:
            "Most surveys need to be completed in one session to maintain data quality. However, some longer surveys may allow you to save your progress. Look for the 'Save Progress' option if available, or plan to complete shorter surveys when you have uninterrupted time.",
        },
        {
          question: "Why was my survey response rejected?",
          answer:
            "Survey responses may be rejected for incomplete answers, inconsistent responses, or failing attention check questions. We have quality measures to ensure reliable data. Always read questions carefully and provide honest, thoughtful responses to avoid rejection.",
        },
      ],
    },
    {
      title: "Rewards & Payments",
      icon: Gift,
      questions: [
        {
          question: "How do I earn rewards?",
          answer:
            "You earn rewards by successfully completing surveys, referring friends, participating in bonus activities, and maintaining an active account. Each completed survey adds points to your account balance, which can be redeemed for various rewards.",
        },
        {
          question: "What types of rewards are available?",
          answer:
            "We offer multiple reward options including PayPal cash, gift cards to popular retailers (Amazon, Target, Starbucks), cryptocurrency, and charitable donations. New reward options are added regularly based on member feedback.",
        },
        {
          question: "What's the minimum amount I can cash out?",
          answer:
            "The minimum cashout varies by reward type: $5 for PayPal, $10 for most gift cards, and $25 for bank transfers. This ensures cost-effective processing while keeping thresholds accessible for regular participants.",
        },
        {
          question: "How long does it take to receive my rewards?",
          answer:
            "Digital rewards (PayPal, gift cards) are typically processed within 1-3 business days. Physical rewards may take 7-14 business days for delivery. You'll receive email confirmation and tracking information when applicable.",
        },
        {
          question: "Do rewards expire?",
          answer:
            "Points in your Survecta account don't expire as long as your account remains active. However, some third-party gift cards may have expiration dates set by the retailer. Check the terms for each specific reward before redeeming.",
        },
      ],
    },
    {
      title: "Account Management",
      icon: Settings,
      questions: [
        {
          question: "How do I update my profile information?",
          answer:
            "Go to your Account Settings from the dashboard menu. You can update your personal information, demographic details, communication preferences, and password. Keeping your profile current helps us match you with more relevant surveys.",
        },
        {
          question: "Can I change my email address?",
          answer:
            "Yes, you can change your email address in Account Settings. You'll need to verify the new email address before the change takes effect. Make sure to use an email you regularly check for survey invitations and account updates.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "If you wish to delete your account, contact our support team or use the account deletion option in your settings. Please note that deleting your account will forfeit any unredeemed rewards, and this action cannot be undone.",
        },
        {
          question: "What if I forgot my password?",
          answer:
            "Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link via email. Follow the instructions to create a new password. If you don't receive the email, check your spam folder or contact support.",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      questions: [
        {
          question: "How is my personal information protected?",
          answer:
            "We use industry-standard encryption and security measures to protect your data. Your personal information is never sold to third parties, and survey responses are anonymized. We comply with GDPR, CCPA, and other privacy regulations.",
        },
        {
          question: "Who sees my survey responses?",
          answer:
            "Survey responses are anonymized and aggregated before being shared with research clients. No personally identifiable information is connected to your individual responses. Clients receive statistical data and trends, not individual profiles.",
        },
        {
          question: "Can I opt out of certain types of surveys?",
          answer:
            "Yes, you can set preferences in your account settings to avoid certain survey topics or types. You can also decline any survey invitation without penalty. We respect your comfort level and privacy preferences.",
        },
        {
          question: "Do you share my information with other companies?",
          answer:
            "We never sell your personal information. We may share anonymized, aggregated data with research partners, but this cannot be traced back to individual users. Read our Privacy Policy for complete details on data handling.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: HelpCircle,
      questions: [
        {
          question: "What browsers are supported?",
          answer:
            "Survecta works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience. Mobile browsers are also fully supported for surveys on-the-go.",
        },
        {
          question: "I'm having trouble accessing surveys on mobile",
          answer:
            "Our platform is mobile-optimized, but some surveys may work better on desktop. Try refreshing the page, clearing your browser cache, or switching to a desktop computer. Contact support if problems persist.",
        },
        {
          question: "What should I do if a survey won't load?",
          answer:
            "First, try refreshing the page or clearing your browser cache. Check your internet connection and disable ad blockers temporarily. If the problem continues, report it to our support team with details about your browser and device.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach our support team through the Contact Us page, email us directly, or use the live chat feature when available. We typically respond within 24 hours and provide assistance in multiple languages.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Find answers to common questions about Survecta, surveys, rewards, and account management
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {section.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${sectionIndex}-${faqIndex}`}
                      className="border border-gray-200 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed pt-2">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <Card className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xl">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you with any questions or
              concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Contact Support
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
