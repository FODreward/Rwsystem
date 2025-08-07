"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [deviceFingerprint, setDeviceFingerprint] = useState("")
  const [ipAddress, setIpAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { saveAuthData } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Get fingerprint & IP on mount
  useEffect(() => {
    const loadDeviceInfo = async () => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        setDeviceFingerprint(result.visitorId)

        const ipRes = await fetch("https://api.ipify.org?format=json")
        const ipData = await ipRes.json()
        setIpAddress(ipData.ip)
      } catch (error) {
        console.error("Error loading fingerprint or IP:", error)
      }
    }

    loadDeviceInfo()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Fingerprint": deviceFingerprint,
          "User-Agent": navigator.userAgent,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Login failed")
      }

      const data = await response.json()
      saveAuthData(data.access_token, data.user)

      toast({
        title: "Login Successful",
        description: "Redirecting to PIN verification...",
      })

      router.push("/pin-verify-login")
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials.",
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
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary-600 hover:text-primary-800">
                Create Account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
