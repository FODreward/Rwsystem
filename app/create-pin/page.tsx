"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function CreatePinPage() {
  const [newPin, setNewPin] = useState("")
  const [confirmNewPin, setConfirmNewPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [tempSignupData, setTempSignupData] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("tempSignupData")
      if (storedData) {
        try {
          setTempSignupData(JSON.parse(storedData))
        } catch (e) {
          console.error("Failed to parse tempSignupData:", e)
          toast({
            title: "Session Error",
            description: "Signup session data is corrupted. Please start signup again.",
            variant: "destructive",
          })
          router.push("/signup")
        }
      } else {
        toast({
          title: "Session Expired",
          description: "No signup data found. Please start signup again.",
          variant: "destructive",
        })
        router.push("/signup")
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

    if (!tempSignupData || !tempSignupData.email) {
      toast({
        title: "Session Expired",
        description: "Signup session expired. Please start again.",
        variant: "destructive",
      })
      setTimeout(() => router.push("/signup"), 2000)
      setIsLoading(false)
      return
    }

    const fullSignupData = {
      ...tempSignupData,
      pin: newPin,
    }

    try {
      await apiCall("/auth/signup", "POST", fullSignupData)
      toast({
        title: "Account Created",
        description: "Account created and PIN set successfully! Redirecting to login...",
      })
      sessionStorage.removeItem("tempSignupData")
      setTimeout(() => router.push("/login"), 2000)
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account or set PIN.",
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
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your 4-Digit PIN</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">This PIN will be used for quick access to your dashboard.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="newPin">New PIN</Label>
              <PasswordInput
                id="newPin"
                name="newPin"
                maxLength={4}
                pattern="\d{4}"
                required
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="confirmNewPin">Confirm New PIN</Label>
              <PasswordInput
                id="confirmNewPin"
                name="confirmNewPin"
                maxLength={4}
                pattern="\d{4}"
                required
                value={confirmNewPin}
                onChange={(e) => setConfirmNewPin(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? "Creating PIN..." : "Create PIN"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-primary-600 hover:text-primary-800">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
