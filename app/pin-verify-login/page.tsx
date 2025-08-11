"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PinInput } from "@/components/ui/pin-input"
import { apiCall } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function PinVerifyLoginPage() {
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { clearAuthData } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await apiCall("/auth/verify-pin", "POST", { pin }, true)
      toast({
        title: "PIN Verified",
        description: "Accessing dashboard...",
      })

      const redirectToPath = sessionStorage.getItem("prePinVerifyPath") || "/dashboard"
      sessionStorage.removeItem("prePinVerifyPath")
      router.push(redirectToPath)
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid PIN. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuthData()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mb-6">Enter Your PIN</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">Please enter your 4-digit PIN to access your dashboard.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="pin">PIN</Label>
              <PinInput id="pin" name="pin" length={4} required value={pin} onChange={setPin} disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Verifying PIN..." : "Verify PIN"}
            </Button>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <Button type="button" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
              Logout
            </Button>
            <Link href="/reset-pin" className="text-sm text-blue-600 hover:text-blue-800">
              Reset PIN
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
