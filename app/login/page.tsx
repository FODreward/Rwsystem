"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

const loadRecaptchaScript = (onLoad: () => void) => {
  const script = document.createElement("script")
  script.src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit`
  script.async = true
  script.defer = true
  script.onload = onLoad
  document.body.appendChild(script)
}

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)

  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    window.onloadCallback = () => {
      setRecaptchaReady(true)
      if (window.grecaptcha && recaptchaRef.current) {
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          size: "invisible",
        })
      }
    }
    loadRecaptchaScript(window.onloadCallback)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaReady || widgetIdRef.current === null) {
      toast({ title: "reCAPTCHA not ready. Please try again." })
      return
    }

    setLoading(true)

    try {
      const recaptchaToken = await window.grecaptcha.execute(widgetIdRef.current)

      if (!recaptchaToken || typeof recaptchaToken !== "string") {
        throw new Error("Failed to retrieve reCAPTCHA token.")
      }

      const response = await apiCall("/auth/login", "POST", {
        email,
        password,
        recaptcha_token: recaptchaToken,
      })

      if (response.success) {
        sessionStorage.setItem("accessToken", response.access_token)
        sessionStorage.setItem("currentUser", JSON.stringify(response.user))
        router.push("/dashboard")
      } else {
        toast({ title: response.message || "Login failed", variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Login failed", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div ref={recaptchaRef} className="mt-4" />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}
