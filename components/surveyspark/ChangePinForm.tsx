"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PinInput } from "@/components/ui/pin-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Shield, Lock, CheckCircle, AlertCircle, Info } from "lucide-react"

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
    <div className="bg-white rounded-2xl shadow-xl max-w-lg mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Change PIN</h3>
              <p className="text-blue-100 text-sm">Update your security PIN</p>
            </div>
          </div>
          <Button
            onClick={onReturnToDashboard}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">PIN Security Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use a unique 4-digit combination</li>
                <li>• Avoid sequential numbers (1234) or repeated digits (1111)</li>
                <li>• Don't use easily guessable dates or patterns</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="oldPin" className="text-base font-semibold text-gray-900 flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Current PIN</span>
            </Label>
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
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {oldPin.length > 0 && !isOldPinValid && (
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>PIN must be exactly 4 digits</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPin" className="text-base font-semibold text-gray-900 flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>New PIN</span>
            </Label>
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
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {newPin.length > 0 && (
              <div className="space-y-1">
                {!isNewPinValid && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>PIN must be exactly 4 digits</span>
                  </p>
                )}
                {isNewPinValid && oldPin === newPin && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>New PIN must be different from current PIN</span>
                  </p>
                )}
                {isNewPinValid && oldPin !== newPin && oldPin.length === 4 && (
                  <p className="text-sm text-green-600 flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>New PIN looks good!</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Your PIN is encrypted and stored securely. Never share it with anyone.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
