"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!

  useEffect(() => {
    const loadRecaptchaScript = () => {
      if (document.getElementById("recaptcha-script")) return

      const script = document.createElement("script")
      script.id = "recaptcha-script"
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.async = true
      document.body.appendChild(script)
    }

    loadRecaptchaScript()
  }, [RECAPTCHA_SITE_KEY])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "login",
      })

      const deviceFingerprint = localStorage.getItem("deviceFingerprint") || "unknown"
      const userAgent = navigator.userAgent
      const ipAddress = "" // Set on backend via request.headers

      const res = await fetch("https://dansog-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          device_fingerprint: deviceFingerprint,
          user_agent: userAgent,
          ip_address: ipAddress,
          recaptcha_token: recaptchaToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({
          title: "Login Failed",
          description: data.detail || "Invalid credentials or bot detected",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Save auth token & user info
      sessionStorage.setItem("accessToken", data.access_token)
      sessionStorage.setItem("currentUser", JSON.stringify(data.user))

      toast({ title: "Login successful" })
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
