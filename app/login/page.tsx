"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { api, getDeviceFingerprint } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const router = useRouter()
  const ipAddressRef = useRef<string | null>(null)

  useEffect(() => {
    // Fetch IP address on component mount
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        ipAddressRef.current = data.ip
      })
      .catch((err) => {
        console.error("Failed to fetch IP address:", err)
        ipAddressRef.current = "unknown"
      })
  }, [])

  const handleLogin = async () => {
    setError("")
    setMessage("")
    setIsSubmitting(true)

    if (!executeRecaptcha) {
      setError("reCAPTCHA not loaded. Please try again.")
      setIsSubmitting(false)
      return
    }

    try {
      const recaptchaToken = await executeRecaptcha("login")
      const deviceFingerprint = await getDeviceFingerprint()
      const userAgent = navigator.userAgent
      const ipAddress = ipAddressRef.current || "unknown"

      const response = await api.auth.login({
        email,
        password,
        device_fingerprint: deviceFingerprint,
        ip_address: ipAddress,
        user_agent: userAgent,
        recaptcha_token: recaptchaToken,
      })
      setMessage("Login successful! Redirecting to dashboard...")
      // Assuming the API returns a user object or similar to confirm login
      if (response.user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && <p className="text-green-500 text-center mb-4">{message}</p>}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={isSubmitting || !email || !password}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a className="underline" href="/signup">
              Sign Up
            </a>
          </div>
          <div className="mt-2 text-center text-sm">
            <a className="underline" href="/forgot-password">
              Forgot Password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
