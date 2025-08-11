"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Lock, Shield, CheckCircle, AlertCircle, Info, ArrowLeft } from "lucide-react"

export default function ChangePasswordForm({ onReturnToDashboard }: { onReturnToDashboard: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Password validation
  const isCurrentPasswordValid = currentPassword.length >= 6
  const isNewPasswordValid = newPassword.length >= 8
  const isPasswordMatch = newPassword === confirmNewPassword && newPassword.length > 0
  const isFormValid = isCurrentPasswordValid && isNewPasswordValid && isPasswordMatch

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "red", text: "Too short" }
    if (password.length < 8) return { strength: "fair", color: "yellow", text: "Fair" }

    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length

    if (score >= 3 && password.length >= 8) return { strength: "strong", color: "green", text: "Strong" }
    if (score >= 2) return { strength: "good", color: "blue", text: "Good" }
    return { strength: "fair", color: "yellow", text: "Fair" }
  }

  const passwordStrength = getPasswordStrength(newPassword)

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

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 8 characters long.",
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Change Password</h1>
            <p className="text-gray-600">Update your account password</p>
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
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Password Security</h2>
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
                  <h4 className="font-bold text-gray-900 mb-2">Password Security Tips</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use at least 8 characters with mixed case letters</li>
                    <li>• Include numbers and special characters</li>
                    <li>• Avoid common words or personal information</li>
                    <li>• Don't reuse passwords from other accounts</li>
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-base font-bold text-gray-900 flex items-center space-x-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Current Password</span>
                </Label>
                <div className="relative">
                  <PasswordInput
                    id="currentPassword"
                    name="current_password"
                    placeholder="Enter your current password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={isLoading}
                    className={`h-12 ${currentPassword.length > 0 && isCurrentPasswordValid ? "border-green-300 bg-green-50" : currentPassword.length > 0 ? "border-red-300 bg-red-50" : ""}`}
                  />
                  {currentPassword.length > 0 && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      {isCurrentPasswordValid ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {currentPassword.length > 0 && !isCurrentPasswordValid && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>Password must be at least 6 characters</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>New Password</span>
                </Label>
                <div className="relative">
                  <PasswordInput
                    id="newPassword"
                    name="new_password"
                    placeholder="Enter your new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                    className={`h-12 ${newPassword.length > 0 && isNewPasswordValid ? "border-green-300 bg-green-50" : newPassword.length > 0 ? "border-red-300 bg-red-50" : ""}`}
                  />
                  {newPassword.length > 0 && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      {isNewPasswordValid ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {newPassword.length > 0 && (
                  <div className="space-y-2">
                    {!isNewPasswordValid && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>Password must be at least 8 characters</span>
                      </p>
                    )}
                    {newPassword.length >= 3 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Strength:</span>
                        <span className={`text-sm font-medium text-${passwordStrength.color}-600`}>
                          {passwordStrength.text}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                          <div
                            className={`h-2 rounded-full bg-${passwordStrength.color}-500 transition-all duration-300`}
                            style={{
                              width:
                                passwordStrength.strength === "weak"
                                  ? "25%"
                                  : passwordStrength.strength === "fair"
                                    ? "50%"
                                    : passwordStrength.strength === "good"
                                      ? "75%"
                                      : "100%",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-base font-bold text-gray-900 flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Confirm New Password</span>
                </Label>
                <div className="relative">
                  <PasswordInput
                    id="confirmPassword"
                    name="confirm_password"
                    placeholder="Confirm your new password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    disabled={isLoading}
                    className={`h-12 ${confirmNewPassword.length > 0 && isPasswordMatch ? "border-green-300 bg-green-50" : confirmNewPassword.length > 0 ? "border-red-300 bg-red-50" : ""}`}
                  />
                  {confirmNewPassword.length > 0 && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      {isPasswordMatch ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {confirmNewPassword.length > 0 && (
                  <div>
                    {!isPasswordMatch && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>Passwords do not match</span>
                      </p>
                    )}
                    {isPasswordMatch && (
                      <p className="text-sm text-green-600 flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Passwords match!</span>
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
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Change Password</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Your password is encrypted and stored securely. You'll be logged out after changing it.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
