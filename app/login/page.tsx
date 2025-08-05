"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall, getDeviceFingerprint } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

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

  const recaptchaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      toast({
        title: "Configuration Error",
        description: "reCAPTCHA site key is not configured.",
        variant: "destructive",
      })
      return
    }

    window.onloadCallback = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          size: "invisible",
        })
        setRecaptchaReady(true)
      }
    }

    const scriptId = "recaptcha-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit`
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    } else if (window.grecaptcha) {
      // Already loaded
      window.onloadCallback()
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!recaptchaReady || !window.grecaptcha) {
      toast({
        title: "Error",
        description: "reCAPTCHA not ready. Please refresh and try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const deviceFingerprint = await getDeviceFingerprint()
      const userAgent = navigator.userAgent

      const recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "login" })

      const response = await apiCall<{ access_token: string; token_type: string; user: any }>(
        "/auth/login",
        "POST",
        {
          email,
          password,
          device_fingerprint: deviceFingerprint,
          ip_address: "client_ip_placeholder",
          user_agent: userAgent,
          recaptcha_token: recaptchaToken,
        }
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
        description: error?.message || "An unexpected error occurred.",
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

            {/* Invisible reCAPTCHA renders here */}
            <div ref={recaptchaRef} />
          </form>

          <div className="mt-6 text-center">
            <Link href="/signup" className="text-sm text-primary-600 hover:text-primary-800">
              Don&apos;t have an account? Sign Up
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
