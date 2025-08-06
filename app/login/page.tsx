"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { apiCall } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const router = useRouter()

  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!

  // Load reCAPTCHA script
  useEffect(() => {
    const onLoad = () => {
      setRecaptchaReady(true)
    }

    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = onLoad
    document.body.appendChild(script)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaReady || !window.grecaptcha) {
      toast({ title: "reCAPTCHA not ready. Please try again." })
      return
    }

    setLoading(true)

    try {
      const token = await window.grecaptcha.execute(SITE_KEY, { action: "login" })

      if (!token) throw new Error("Failed to generate reCAPTCHA token.")

      const response = await apiCall("/auth/login", "POST", {
        email,
        password,
        recaptcha_token: token,
      })

      if (response.success) {
        sessionStorage.setItem("accessToken", response.access_token)
        sessionStorage.setItem("currentUser", JSON.stringify(response.user))
        router.push("/dashboard")
      } else {
        toast({ title: response.message || "Login failed", variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Login error", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}
