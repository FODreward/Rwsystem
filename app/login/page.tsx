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
import { apiCall, getDeviceFingerprint, getIpAddress, loadRecaptchaScript } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    grecaptcha: any
    onloadCallback: () => void
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()

  const ipAddressRef = useRef<string | null>(null)

  useEffect(() => {
    // Fetch IP address
    getIpAddress().then(ip => {
      ipAddressRef.current = ip
    }).catch(() => {
      ipAddressRef.current = "unknown"
    })

    // reCAPTCHA ready callback
    window.onloadCallback = () => {
      setRecaptchaReady(true)
    }

    loadRecaptchaScript(window.onloadCallback)
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!recaptchaReady) {
      toast({
        title: "Error",
        description: "reCAPTCHA is not ready. Please try again shortly.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const deviceFingerprint = await getDeviceFingerprint()
      const userAgent = navigator.userAgent
      const ipAddress = ipAddressRef.current || "unknown"

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (window.grecaptcha?.execute) {
          window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "login" })
            .then((token: string) => {
              window.grecaptcha.reset()
              resolve(token)
            })
            .catch(reject)
        } else {
          reject(new Error("reCAPTCHA not available."))
        }
      })

      const response = await apiCall<{ access_token: string; token_type: string; user: any }>(
        "/auth/login",
        "POST",
        {
          email,
          password,
          device_fingerprint: deviceFingerprint,
          ip_address: ipAddress,
          user_agent: userAgent,
          recaptcha_token: recaptchaToken,
        },
        false,
        {},
        recaptchaToken,
      )

      login(response.access_token, response.user)
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials.",
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
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* reCAPTCHA badge is invisible and auto-loaded, no need to render manually */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button type="submit" className="w-full btn-primary" disabled={isLoading || !recaptchaReady}>
              {isLoading ? "Logging In..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/signup" className="text-sm text-primary-600 hover:text-primary-800">
              Don't have an account? Sign Up
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
              Forgot Password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
