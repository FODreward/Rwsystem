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
import { Shield, Mail, RefreshCw, ArrowLeft } from "lucide-react"

export default function ForgotPasswordOtpPage() {
  const [otpCode, setOtpCode] = useState("")
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("forgotPasswordEmail")
      if (storedEmail) {
        setEmail(storedEmail)
      } else {
        toast({
          title: "Session Expired",
          description: "No email found for password reset. Please start again.",
          variant: "destructive",
        })
        router.push("/forgot-password")
      }
    }
  }, [router, toast])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!email) {
      toast({
        title: "Error",
        description: "Email not found. Please go back to forgot password.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await apiCall("/auth/verify-otp", "POST", { email, otp_code: otpCode, purpose: "password_reset" })
      sessionStorage.setItem("forgotPasswordOtp", otpCode)
      toast({
        title: "OTP Verified",
        description: "Redirecting to set new password...",
      })
      setTimeout(() => {
        router.push("/new-password")
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
        description: "Email not found for OTP resend. Please go back to forgot password.",
        variant: "destructive",
      })
      setIsResending(false)
      return
    }

    try {
      await apiCall("/auth/request-otp", "POST", { email, purpose: "password_reset" })
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Verify Password Reset OTP</CardTitle>
          <p className="text-gray-600">An OTP has been sent to your email address for password reset.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otpCode" className="text-sm font-medium text-gray-700">
                OTP Code
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                  className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter 6-digit OTP"
                />
              </div>
              {otpCode && otpCode.length === 6 && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  OTP format is valid
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-lg transition-all duration-200"
              disabled={isLoading || isResending}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Button
              type="button"
              onClick={handleResendOtp}
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold bg-transparent"
              disabled={isLoading || isResending}
            >
              {isResending ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Resending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Resend OTP
                </div>
              )}
            </Button>
          </form>
          <div className="text-center pt-4 border-t border-gray-100">
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forgot Password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
