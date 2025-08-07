"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { apiCall } from "@/lib/api"
import PasswordInput from "@/components/shared/password-input"
import getDeviceFingerprint from "@/lib/fingerprint"
import getIpAddress from "@/lib/ip"

const LoginPage = () => {
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [deviceFingerprint, setDeviceFingerprint] = useState("")
  const [ipAddress, setIpAddress] = useState("")
  const [userAgent, setUserAgent] = useState("")

  useEffect(() => {
    const fetchMetadata = async () => {
      const fingerprint = await getDeviceFingerprint()
      const ip = await getIpAddress()
      setDeviceFingerprint(fingerprint)
      setIpAddress(ip)
      setUserAgent(navigator.userAgent || "")
    }
    fetchMetadata()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in both email and password.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const res = await apiCall("/auth/login", "POST", {
        email,
        password,
        device_fingerprint: deviceFingerprint,
        ip_address: ipAddress,
        user_agent: userAgent,
      })

      if (res.success && res.data?.access_token && res.data?.user) {
        sessionStorage.setItem("accessToken", res.data.access_token)
        sessionStorage.setItem("currentUser", JSON.stringify(res.data.user))

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login Failed",
          description: res.message || "Invalid email or password.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
