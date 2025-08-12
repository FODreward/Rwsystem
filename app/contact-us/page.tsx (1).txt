"use client"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, MessageSquare, Building, Users, Shield, Zap, Star } from "lucide-react"

export default function ContactUsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send this data to your backend
    console.log("Contact Form Submission:", { name, email, subject, message })

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you within 24 hours.",
    })

    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 py-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Get in Touch with Survecta</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your success is our priority. Whether you need support, have questions about surveys, or want to share
            feedback, our dedicated team is here to help you maximize your earning potential.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
            <p className="text-sm text-gray-600">24-hour response guarantee</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-sm text-gray-600">Dedicated survey specialists</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-sm text-gray-600">Your data is protected</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">5-Star Service</h3>
            <p className="text-sm text-gray-600">Rated by our community</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Email Support</h3>
                    <p className="text-white/90 text-lg">info@survecta.com</p>
                    <p className="text-white/70 text-sm">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Phone Support</h3>
                    <p className="text-white/90 text-lg">+1 (555) 123-4567</p>
                    <p className="text-white/70 text-sm">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Office Address</h3>
                    <p className="text-white/90">
                      123 Survey Street
                      <br />
                      Business District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Business Hours</h3>
                    <p className="text-white/90 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-white/90 text-sm">Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p className="text-white/90 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full h-48 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <Building className="w-16 h-16 text-white/70 mx-auto mb-3" />
                    <p className="text-white/70 text-sm">Office Photo Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">We'd love to hear from you</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Whether you have questions about surveys, need technical support, or want to provide feedback, we're
                here to help. Fill out the form below and we'll get back to you promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-800 font-semibold text-sm mb-2 block">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-800 font-semibold text-sm mb-2 block">
                      Your Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-800 font-semibold text-sm mb-2 block">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                    placeholder="What is your message about?"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-800 font-semibold text-sm mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about Survecta's survey platform and earning opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">How do I get started?</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply sign up for a free account, verify your email, and start taking surveys to earn points
                immediately.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">When do I get paid?</h3>
              <p className="text-gray-600 leading-relaxed">
                Payments are processed within 24-48 hours after redemption request approval.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Is my data secure?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we use industry-standard encryption and never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-20 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/signup">Start Earning Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              <Link href="/login">Login to Account</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
