import { Search, Book, Users, Gift, Shield, Settings, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HelpCenter() {
  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using Survecta",
      articles: [
        "How to create your first account",
        "Understanding the dashboard",
        "Setting up your profile",
        "First survey walkthrough",
      ],
    },
    {
      icon: Users,
      title: "Taking Surveys",
      description: "Everything about participating in surveys",
      articles: [
        "How to find available surveys",
        "Survey completion tips",
        "Why surveys get disqualified",
        "Mobile vs desktop surveys",
      ],
    },
    {
      icon: Gift,
      title: "Rewards & Points",
      description: "Managing your earnings and rewards",
      articles: [
        "How the points system works",
        "Redeeming your rewards",
        "Payment processing times",
        "Minimum payout requirements",
      ],
    },
    {
      icon: Shield,
      title: "Account Security",
      description: "Keeping your account safe and secure",
      articles: [
        "Setting up two-factor authentication",
        "Password security best practices",
        "Recognizing phishing attempts",
        "Account recovery options",
      ],
    },
    {
      icon: Settings,
      title: "Account Management",
      description: "Managing your profile and preferences",
      articles: [
        "Updating personal information",
        "Email notification settings",
        "Privacy preferences",
        "Deleting your account",
      ],
    },
    {
      icon: MessageCircle,
      title: "Troubleshooting",
      description: "Solutions to common issues",
      articles: [
        "Survey not loading properly",
        "Points not credited",
        "Login and access issues",
        "Browser compatibility",
      ],
    },
  ]

  const popularArticles = [
    "How long does it take to receive rewards?",
    "Why was I disqualified from a survey?",
    "How to increase survey opportunities",
    "Understanding point values",
    "Troubleshooting payment issues",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Book className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Find answers to your questions and get the most out of your Survecta experience
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 py-3 bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                      {article}
                    </p>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {category.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li
                          key={articleIndex}
                          className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3 mr-2 flex-shrink-0" />
                          {article}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white text-center">
  <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
  <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
    Can't find what you're looking for? Our support team is here to help you with any questions or issues.
  </p>

  <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <MessageCircle className="w-8 h-8 mx-auto mb-3" />
      <h3 className="font-semibold mb-2">Live Chat</h3>
      <p className="text-sm text-purple-100 mb-4">Get instant help from our support team</p>

      <Button
        variant="secondary"
        size="sm"
        className="bg-white text-purple-600 hover:bg-gray-100"
        onClick={() => {
          if (window.jivo_api) {
            window.jivo_api.open();
          } else {
            alert("Chat widget not loaded yet. Please try again in a moment.");
          }
        }}
      >
        Start Chat
      </Button>
    </div>
  </div>
</div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
  <Mail className="w-8 h-8 mx-auto mb-3" />
  <h3 className="font-semibold mb-2">Email Support</h3>
  <p className="text-sm text-purple-100 mb-4">Send us a detailed message</p>
  
  <a 
    href="mailto:info@survecta.com" 
    className="hover:text-white transition-colors"
  >
    <Button 
      variant="secondary" 
      size="sm" 
      className="bg-white text-purple-600 hover:bg-gray-100"
    >
      Send Email
    </Button>
  </a>
</div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-purple-100 mb-4">Speak directly with our team</p>
              <Button variant="secondary" size="sm" className="bg-white text-purple-600 hover:bg-gray-100">
                Call Now
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="/contact-us">Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
