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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Verify Password Reset OTP</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">
            An OTP has been sent to your email address for password reset.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="otpCode">OTP Code</Label>
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
              />
            </div>
            <Button type="submit" className="w-full btn-primary" disabled={isLoading || isResending}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              type="button"
              onClick={handleResendOtp}
              className="w-full btn-secondary"
              disabled={isLoading || isResending}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
              Back to Forgot Password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
