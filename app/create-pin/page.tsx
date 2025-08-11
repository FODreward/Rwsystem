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
import { Shield, Check, X, Loader2 } from "lucide-react"

export default function CreatePinPage() {
  const [newPin, setNewPin] = useState("")
  const [confirmNewPin, setConfirmNewPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [tempSignupData, setTempSignupData] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  const isPinValid = newPin.length === 4 && /^\d{4}$/.test(newPin)
  const pinsMatch = newPin === confirmNewPin && confirmNewPin.length === 4

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
      router.push("/signup")
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
      router.push("/login")
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Create Your 4-Digit PIN
          </CardTitle>
          <p className="text-gray-600 mt-2">This PIN will be used for quick access to your dashboard.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <Label htmlFor="newPin" className="text-sm font-medium text-gray-700 mb-2 block">
                New PIN
              </Label>
              <div className="flex justify-center">
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
              {newPin.length > 0 && (
                <div className="flex items-center justify-center mt-2">
                  {isPinValid ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      Valid PIN
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 text-sm">
                      <X className="w-4 h-4 mr-1" />
                      PIN must be 4 digits
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center">
              <Label htmlFor="confirmNewPin" className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm New PIN
              </Label>
              <div className="flex justify-center">
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
              {confirmNewPin.length > 0 && (
                <div className="flex items-center justify-center mt-2">
                  {pinsMatch ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      PINs match
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 text-sm">
                      <X className="w-4 h-4 mr-1" />
                      PINs don't match
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading || !isPinValid || !pinsMatch}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating PIN...
                </>
              ) : (
                "Create PIN"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-purple-600" />
              Security Tips
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Choose a PIN that's easy for you to remember</li>
              <li>• Don't use obvious combinations like 1234 or 0000</li>
              <li>• Keep your PIN confidential and secure</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
