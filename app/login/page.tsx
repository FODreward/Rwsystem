"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { apiCall } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [deviceFingerprint, setDeviceFingerprint] = useState("")
  const [userAgent, setUserAgent] = useState("")
  const [ipAddress, setIpAddress] = useState("")
  const [loading, setLoading] = useState(false)

  // Load device fingerprint, IP, and user agent
  useEffect(() => {
    const loadDeviceInfo = async () => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        setDeviceFingerprint(result.visitorId)

        const ipRes = await fetch("https://api.ipify.org?format=json")
        const ipData = await ipRes.json()
        setIpAddress(ipData.ip)

        setUserAgent(navigator.userAgent)
      } catch (error) {
        console.error("Device info error:", error)
      }
    }

    loadDeviceInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !deviceFingerprint || !userAgent || !ipAddress) {
      toast({ title: "Please wait for device info to load", variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      const response = await apiCall("/login", "POST", {
        email,
        password,
        device_fingerprint: deviceFingerprint,
        user_agent: userAgent,
        ip_address: ipAddress,
      })

      if (response.access_token) {
        sessionStorage.setItem("accessToken", response.access_token)
        sessionStorage.setItem("currentUser", JSON.stringify(response.user))
        toast({ title: "Login successful" })
        router.push("/dashboard")
      } else {
        toast({ title: response.message || "Login failed", variant: "destructive" })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({ title: "Login error", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
