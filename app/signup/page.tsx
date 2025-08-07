"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { useToast } from "@/hooks/use-toast"
import { apiCall } from "@/lib/api"

export default function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get device fingerprint
      const fpAgent = await FingerprintJS.load()
      const fpResult = await fpAgent.get()
      const device_fingerprint = fpResult.visitorId

      // Get IP address
      const ipRes = await fetch("https://api.ipify.org?format=json")
      const ipData = await ipRes.json()
      const ip_address = ipData.ip

      // Get user agent
      const user_agent = navigator.userAgent

      // Construct payload
      const tempSignupData = {
        name,
        email,
        password,
        referral_code: referralCode || null,
        device_fingerprint,
        ip_address,
        user_agent,
      }

      // Save in sessionStorage for OTP step
      sessionStorage.setItem("signupData", JSON.stringify(tempSignupData))

      // Request OTP
      const response = await apiCall("/auth/request-otp", "POST", { email })
      if (response?.success) {
        toast({ title: "OTP sent to your email." })
        router.push("/verify-email") // Or your OTP verification route
      } else {
        toast({ title: "Failed to send OTP", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Signup failed", description: String(error), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-md mt-8">
      <CardHeader>
        <CardTitle className="text-center">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="referral">Referral Code (optional)</Label>
            <Input id="referral" value={referralCode} onChange={e => setReferralCode(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending OTP..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
