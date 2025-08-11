"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Shield, Lock, CheckCircle, AlertCircle } from "lucide-react"

export default function ChangePasswordForm({ onReturnToDashboard }: { onReturnToDashboard: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "text-red-500", message: "Too short" }
    if (password.length < 8) return { strength: "fair", color: "text-orange-500", message: "Fair strength" }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      return { strength: "good", color: "text-yellow-500", message: "Good strength" }
    return { strength: "strong", color: "text-green-500", message: "Strong password" }
  }

  const passwordStrength = getPasswordStrength(newPassword)
  const passwordsMatch = newPassword && confirmNewPassword && newPassword === confirmNewPassword

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await apiCall(
        "/users/change-password",
        "POST",
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        true,
      )
      toast({
        title: "Password Changed",
        description: "Password changed successfully!",
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (error: any) {
      toast({
        title: "Change Failed",
        description: error.message || "Failed to change password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Change Password</h3>
              <p className="text-blue-100 text-sm">Update your account security</p>
            </div>
          </div>
          <Button onClick={onReturnToDashboard} variant="ghost" className="text-white hover:bg-white/20">
            ← Back
          </Button>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
              Current Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <PasswordInput
                id="currentPassword"
                name="current_password"
                placeholder="Enter current password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <PasswordInput
                id="newPassword"
                name="new_password"
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {newPassword && (
              <div className="flex items-center space-x-2 mt-2">
                <div className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden`}>
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength.strength === "weak"
                        ? "w-1/4 bg-red-500"
                        : passwordStrength.strength === "fair"
                          ? "w-2/4 bg-orange-500"
                          : passwordStrength.strength === "good"
                            ? "w-3/4 bg-yellow-500"
                            : "w-full bg-green-500"
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium ${passwordStrength.color}`}>{passwordStrength.message}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <PasswordInput
                id="confirmPassword"
                name="confirm_password"
                placeholder="Confirm new password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={isLoading}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {confirmNewPassword && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {passwordsMatch ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {confirmNewPassword && !passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200"
            disabled={isLoading || !passwordsMatch || passwordStrength.strength === "weak"}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Updating Password...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Change Password</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Security Tips:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Use at least 8 characters with mixed case, numbers, and symbols</li>
            <li>• Avoid using personal information or common words</li>
            <li>• Don't reuse passwords from other accounts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
