"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PinInput } from "@/components/ui/pin-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function SetNewPinPage() {
  const [newPin, setNewPin] = useState("")
  const [confirmNewPin, setConfirmNewPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [otpCode, setOtpCode] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("pinResetEmail")
      const storedOtp = sessionStorage.getItem("pinResetOtp")
      if (storedEmail && storedOtp) {
        setEmail(storedEmail)
        setOtpCode(storedOtp)
      } else {
        toast({
          title: "Session Expired",
          description: "PIN reset session expired. Please restart the process.",
          variant: "destructive",
        })
        router.push("/reset-pin")
      }
    }
  }, [router, toast])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (newPin !== confirmNewPin) {
      toast({
        title: "PIN Mismatch",
        description: "PINs do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be a 4-digit number.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!email || !otpCode) {
      toast({
        title: "Session Error",
        description: "PIN reset session invalid. Please restart.",
        variant: "destructive",
      })
      router.push("/reset-pin")
      setIsLoading(false)
      return
    }

    try {
      await apiCall("/auth/reset-pin", "POST", {
        email,
        otp_code: otpCode,
        new_pin: newPin,
      })
      toast({
        title: "PIN Reset",
        description: "New PIN set successfully! Redirecting to PIN verification...",
      })
      sessionStorage.removeItem("pinResetEmail")
      sessionStorage.removeItem("pinResetOtp")
      router.push("/pin-verify-login")
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "Failed to set new PIN.",
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
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Set Your New PIN</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="newPin">New PIN</Label>
              <PinInput
                id="newPin"
                name="newPin"
                length={4}
                required
                value={newPin}
                onChange={setNewPin}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="confirmNewPin">Confirm New PIN</Label>
              <PinInput
                id="confirmNewPin"
                name="confirmNewPin"
                length={4}
                required
                value={confirmNewPin}
                onChange={setConfirmNewPin}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Setting PIN..." : "Set New PIN"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
