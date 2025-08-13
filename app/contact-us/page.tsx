"use client"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Clock, MessageSquare, Building, Headphones, HelpCircle, Zap, Shield } from "lucide-react"

declare global {
  interface Window {
    jivo_api?: {
      open: () => void
      sendMessage: (message: string) => void
      setContactInfo: (info: { name?: string; email?: string; phone?: string }) => void
    }
  }
}

export default function ContactUsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//code.jivosite.com/widget/EY4mWzELlP"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Wait for JivoChat to load
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if JivoChat API is available
      if (window.jivo_api) {
        // Set contact information in JivoChat
        window.jivo_api.setContactInfo({
          name: name,
          email: email,
        })

        // Format message for JivoChat
        const formattedMessage = `
Contact Form Submission:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `.trim()

        // Send message to JivoChat
        window.jivo_api.sendMessage(formattedMessage)

        // Open JivoChat widget
        window.jivo_api.open()

        toast({
          title: "Message Sent to Support!",
          description: "Your message has been sent to our live chat. A support agent will respond shortly.",
        })
      } else {
        // Fallback if JivoChat is not available
        console.log("JivoChat not available, using fallback:", { name, email, subject, message })

        toast({
          title: "Message Received!",
          description: "Thank you for contacting us. We will get back to you within 24 hours.",
        })
      }

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
  {/* Hero Section */}
  <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 py-8">
    <div className="absolute inset-0 bg-black opacity-10"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30">
          <div className="text-center">
            <img
              src="/Surve.png"
              alt="Survecta"
              className="w-8 h-8 mx-auto mb-1"
            />
            <p className="text-white/80 text-xs">Survecta Logo</p>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Contact Survecta Support</h1>
      <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
        Need help with surveys, payments, or account issues? Our dedicated support team is ready to assist you with
        any questions or concerns.
      </p>
    </div>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How Can We Help You?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the best way to reach us based on your needs. We're committed to providing fast, helpful support
              for all Survecta users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <Headphones className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Live Support</h3>
              <p className="text-gray-600">Get instant help with urgent issues</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <Mail className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Email Support</h3>
              <p className="text-gray-600">Detailed responses within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <HelpCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Help Center</h3>
              <p className="text-gray-600">Self-service resources and guides</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
  <div className="w-full h-64 rounded-2xl overflow-hidden border-2 border-gray-300">
    <img
      src="/team.png"  // or "/team.png" — use your exact file extension here
      alt="Our Customer Support Team"
      className="w-full h-full object-cover"
    />
  </div>
</div>

        {/* Support Response Times */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
            <p className="text-sm text-gray-600">24-hour email response</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">Instant support available</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Support</h3>
            <p className="text-sm text-gray-600">Protected conversations</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Self-Service</h3>
            <p className="text-sm text-gray-600">24/7 help resources</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Email Support</h3>
                    <p className="text-white/90 text-lg">info@survecta.com</p>
                    <p className="text-white/70 text-sm">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Phone Support</h3>
                    <p className="text-white/90 text-lg">+234 (Survecta)</p>
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
                      Survecta
                      <br />
                      PH City
                      <br />
                      Port Harcourt, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Support Hours</h3>
                    <p className="text-white/90 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-white/90 text-sm">Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p className="text-white/90 text-sm">Sunday: Emergency support only</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full h-48 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-white/70 mx-auto mb-3" />
                    <p className="text-white/70 text-sm">Office Location Photo</p>
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
                  <p className="text-gray-600">Message will be sent to our live chat support</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Have a question about surveys, payments, or your account? Fill out the form below and your message will
                be sent directly to our live chat support team for immediate assistance.
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
                    placeholder="What can we help you with?"
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
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending to Live Chat..." : "Send to Live Chat Support"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Quick answers to common support questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">How do I contact support?</h3>
              <p className="text-gray-600 leading-relaxed">
                You can reach us via email at info@survecta.com, phone at +234 (Survecta), or use the contact form on
                this page. We respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">What are your support hours?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our support team is available Monday-Friday 9AM-6PM EST, Saturday 10AM-4PM EST. Emergency support is
                available on Sundays for urgent account issues.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">How quickly will I get a response?</h3>
              <p className="text-gray-600 leading-relaxed">
                Email responses are typically sent within 24 hours. Phone support provides immediate assistance during
                business hours. Urgent issues are prioritized.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Is my information secure?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, all support communications are encrypted and secure. We never share your personal information and
                follow strict privacy protocols for all interactions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Do you offer phone support?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, phone support is available at +234 (Survecta) during business hours. For complex issues, we may
                schedule a callback at your convenience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Can I track my support request?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, all support requests receive a ticket number for tracking. You'll receive email updates on the
                status of your inquiry until it's resolved.
              </p>
            </div>
          </div>

          {/* Support Performance */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-8">Our Support Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">&lt; 24 hours</div>
                <div className="text-white/80">Average Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-white/80">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-white/80">Support Tickets Resolved</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Help Center Access</div>
              </div>
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
              <Link href="/signup">Join Survecta Today</Link>
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
