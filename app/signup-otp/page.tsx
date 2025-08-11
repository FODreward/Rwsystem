"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Mail, Shield, RefreshCw, ArrowLeft } from "lucide-react"

export default function SignupOtpPage() {
  const [otpCode, setOtpCode] = useState("")
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tempSignupData = sessionStorage.getItem("tempSignupData")
      if (tempSignupData) {
        try {
          const parsedData = JSON.parse(tempSignupData)
          setEmail(parsedData.email)
        } catch (e) {
          console.error("Failed to parse tempSignupData:", e)
          toast({
            title: "Session Error",
            description: "Signup session data is corrupted. Please start signup again.",
            variant: "destructive",
          })
          router.push("/signup")
        }
      } else {
        toast({
          title: "Session Expired",
          description: "No signup data found. Please start signup again.",
          variant: "destructive",
        })
        router.push("/signup")
      }
    }
  }, [router, toast])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!email) {
      toast({
        title: "Error",
        description: "Email not found. Please go back to signup.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await apiCall("/auth/verify-otp", "POST", { email, otp_code: otpCode, purpose: "signup" })
      toast({
        title: "OTP Verified",
        description: "Redirecting to create your PIN...",
      })
      setTimeout(() => {
        router.push("/create-pin")
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "OTP verification failed.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    if (!email) {
      toast({
        title: "Error",
        description: "Email not found for OTP resend. Please go back to signup.",
        variant: "destructive",
      })
      setIsResending(false)
      return
    }

    try {
      await apiCall("/auth/request-otp", "POST", { email, purpose: "signup" })
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        title: "Resend Failed",
        description: error.message || "Failed to resend OTP.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">Verify Your Email</CardTitle>
          <p className="text-center text-purple-100 text-sm mt-2">We've sent a verification code to your email</p>
        </CardHeader>
        <CardContent className="p-6">
          {email && (
            <div className="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Sent to:</span>
                <span className="text-sm font-medium text-gray-900">{email}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="otpCode" className="text-gray-700 font-medium">
                Verification Code
              </Label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="otpCode"
                  name="otpCode"
                  type="text"
                  maxLength={6}
                  pattern="\d{6}"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  disabled={isLoading || isResending}
                  className="pl-10 text-center text-lg font-mono tracking-widest border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="000000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading || isResending}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Verify Code</span>
                </div>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleResendOtp}
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-lg transition-all duration-200 bg-transparent"
              disabled={isLoading || isResending}
            >
              {isResending ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Resending...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Resend Code</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Signup</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
