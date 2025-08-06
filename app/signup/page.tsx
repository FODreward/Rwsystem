"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall, getDeviceFingerprint, getIpAddress } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load reCAPTCHA v2 invisible
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=your_site_key`
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const token = await window.grecaptcha.execute("your_site_key", { action: "signup" })

      const tempSignupData = {
        name,
        email,
        password,
        referral_code: referralCode,
        device_fingerprint: getDeviceFingerprint(),
        ip_address: getIpAddress(),
        user_agent: navigator.userAgent,
        recaptcha_token: token, // include reCAPTCHA token in request
      }

      sessionStorage.setItem("tempSignupData", JSON.stringify(tempSignupData))

      await apiCall("/auth/request-otp", "POST", { email, purpose: "signup", recaptcha_token: token })

      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email. Redirecting to verification...",
      })

      setTimeout(() => {
        router.push("/signup-otp")
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to request OTP.",
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
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="referralCode">Referral Code (Optional)</Label>
              <Input
                id="referralCode"
                name="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
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
