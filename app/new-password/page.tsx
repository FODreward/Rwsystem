"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [otpCode, setOtpCode] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("forgotPasswordEmail")
      const storedOtp = sessionStorage.getItem("forgotPasswordOtp")
      if (storedEmail && storedOtp) {
        setEmail(storedEmail)
        setOtpCode(storedOtp)
      } else {
        toast({
          title: "Session Expired",
          description: "Password reset session expired. Please restart the process.",
          variant: "destructive",
        })
        router.push("/forgot-password")
      }
    }
  }, [router, toast])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!email || !otpCode) {
      toast({
        title: "Session Error",
        description: "Password reset session invalid. Please restart.",
        variant: "destructive",
      })
      setTimeout(() => router.push("/forgot-password"), 2000)
      setIsLoading(false)
      return
    }

    try {
      await apiCall("/auth/reset-password", "POST", {
        email,
        otp_code: otpCode,
        new_password: newPassword,
      })
      toast({
        title: "Password Reset",
        description: "Password reset successfully! Redirecting to login...",
      })
      sessionStorage.removeItem("forgotPasswordEmail")
      sessionStorage.removeItem("forgotPasswordOtp")
      setTimeout(() => router.push("/login"), 1500)
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "Failed to reset password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Set Your New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <PasswordInput
                id="confirmNewPassword"
                name="confirmNewPassword"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? "Setting Password..." : "Set New Password"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-primary-600 hover:text-primary-800">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
