"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall, getDeviceFingerprint, loadRecaptchaScript } from "@/lib/api" // Import getDeviceFingerprint and loadRecaptchaScript
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    grecaptcha: any
    onloadCallback: () => void
  }
}

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const recaptchaRef = useRef<HTMLDivElement>(null) // Ref for reCAPTCHA badge

  useEffect(() => {
    window.onloadCallback = () => {
      setRecaptchaReady(true)
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          size: "invisible",
        })
      }
    }
    loadRecaptchaScript(window.onloadCallback)
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!recaptchaReady) {
      toast({
        title: "Error",
        description: "reCAPTCHA is not ready. Please try again in a moment.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const deviceFingerprint = await getDeviceFingerprint()
      const userAgent = navigator.userAgent

      // Execute reCAPTCHA
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (window.grecaptcha && window.grecaptcha.execute) {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "signup" })
            .then(resolve)
            .catch(reject)
        } else {
          reject(new Error("reCAPTCHA not available."))
        }
      })

      const tempSignupData = {
        name,
        email,
        password,
        referral_code: referralCode,
        device_fingerprint: deviceFingerprint,
        ip_address: "client_ip_placeholder", // Backend will get actual IP from request headers
        user_agent: userAgent,
        recaptcha_token: recaptchaToken,
      }

      sessionStorage.setItem("tempSignupData", JSON.stringify(tempSignupData))

      await apiCall("/auth/request-otp", "POST", { email, purpose: "signup" }, false, {}, recaptchaToken) // Pass recaptchaToken
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
            <Button type="submit" className="w-full btn-primary" disabled={isLoading || !recaptchaReady}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
            {/* reCAPTCHA badge will be rendered here */}
            <div ref={recaptchaRef} className="grecaptcha-badge" />
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
