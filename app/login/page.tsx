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

// Ensure window.grecaptcha is typed for TypeScript
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
  const ipAddressRef = useRef<string | null>(null)

  useEffect(() => {
    // Fetch IP address on component mount
    getIpAddress().then(ip => {
      ipAddressRef.current = ip;
    }).catch(err => {
      console.error("Failed to fetch IP address:", err);
      ipAddressRef.current = "unknown";
    });

    // Initialize reCAPTCHA v2 Invisible
    window.onloadCallback = () => {
      setRecaptchaReady(true)
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, // Use non-null assertion as it's required
          size: "invisible",
          // Optional: if you want auto-submit on success, add a callback here
          // callback: (token: string) => { console.log("reCAPTCHA resolved:", token); }
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
      const ipAddress = ipAddressRef.current || "unknown"

      // Execute reCAPTCHA v2 Invisible without the 'action' parameter
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (window.grecaptcha && window.grecaptcha.execute) {
          window.grecaptcha
            .execute() // Corrected: No action parameter for v2 Invisible
            .then((token: string) => {
              window.grecaptcha.reset(); // Reset reCAPTCHA after execution
              resolve(token);
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
        false, // requiresAuth: false for login
        {},
        recaptchaToken, // Pass recaptchaToken as the last argument for apiCall
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
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* reCAPTCHA badge will be rendered here by grecaptcha.render */}
          <div ref={recaptchaRef} className="grecaptcha-badge" />
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
