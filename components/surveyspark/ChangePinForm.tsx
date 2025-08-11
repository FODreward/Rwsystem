"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PinInput } from "@/components/ui/pin-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Shield, Lock, CheckCircle, AlertCircle, Info, ArrowLeft } from "lucide-react"

export default function ChangePinForm({ onReturnToDashboard }: { onReturnToDashboard: () => void }) {
  const [oldPin, setOldPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const isOldPinValid = oldPin.length === 4 && /^\d{4}$/.test(oldPin)
  const isNewPinValid = newPin.length === 4 && /^\d{4}$/.test(newPin)
  const isFormValid = isOldPinValid && isNewPinValid && oldPin !== newPin

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      toast({
        title: "Invalid PIN",
        description: "New PIN must be a 4-digit number.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (oldPin === newPin) {
      toast({
        title: "Invalid PIN",
        description: "New PIN must be different from your current PIN.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await apiCall(
        "/users/change-pin",
        "POST",
        {
          current_pin: oldPin,
          new_pin: newPin,
        },
        true,
      )
      toast({
        title: "PIN Changed",
        description: "PIN changed successfully!",
      })
      setOldPin("")
      setNewPin("")
    } catch (error: any) {
      toast({
        title: "Change Failed",
        description: error.message || "Failed to change PIN.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Change PIN</h1>
            <p className="text-gray-600">Update your security PIN</p>
          </div>
          <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Security PIN Update</h2>
                <p className="text-purple-100 text-sm">Keep your account secure</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Security Tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mt-0.5">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">PIN Security Tips</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use a unique 4-digit combination</li>
                    <li>• Avoid sequential numbers (1234) or repeated digits (1111)</li>
                    <li>• Don't use easily guessable dates or patterns</li>
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="oldPin"
                  className="text-base font-bold text-gray-900 flex items-center justify-center space-x-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Current PIN</span>
                </Label>
                <div className="flex justify-center">
                  <div className="relative">
                    <PinInput
                      id="oldPin"
                      name="old_pin"
                      length={4}
                      required
                      value={oldPin}
                      onChange={setOldPin}
                      disabled={isLoading}
                    />
                    {oldPin.length > 0 && (
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                        {isOldPinValid ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {oldPin.length > 0 && !isOldPinValid && (
                  <p className="text-sm text-red-600 flex items-center justify-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>PIN must be exactly 4 digits</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="newPin"
                  className="text-base font-bold text-gray-900 flex items-center justify-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>New PIN</span>
                </Label>
                <div className="flex justify-center">
                  <div className="relative">
                    <PinInput
                      id="newPin"
                      name="new_pin"
                      length={4}
                      required
                      value={newPin}
                      onChange={setNewPin}
                      disabled={isLoading}
                    />
                    {newPin.length > 0 && (
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                        {isNewPinValid && oldPin !== newPin ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {newPin.length > 0 && (
                  <div className="space-y-1">
                    {!isNewPinValid && (
                      <p className="text-sm text-red-600 flex items-center justify-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>PIN must be exactly 4 digits</span>
                      </p>
                    )}
                    {isNewPinValid && oldPin === newPin && (
                      <p className="text-sm text-red-600 flex items-center justify-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>New PIN must be different from current PIN</span>
                      </p>
                    )}
                    {isNewPinValid && oldPin !== newPin && oldPin.length === 4 && (
                      <p className="text-sm text-green-600 flex items-center justify-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>New PIN looks good!</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Updating PIN...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Change PIN</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Your PIN is encrypted and stored securely. Never share it with anyone.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
