"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { apiCall, getDeviceFingerprint, getIpAddress } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Lock, Users, Loader2, Calendar, MapPin, Globe, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("") // YYYY-MM-DD
  const [gender, setGender] = useState("") // "male", "female", "other"
  const [countryCode, setCountryCode] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const isPasswordValid = password.length >= 8
  const isFormValid = name.trim() && email.trim() && isPasswordValid

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const deviceFingerprint = await getDeviceFingerprint()
      const ipAddress = await getIpAddress()

      // Split dateOfBirth into day, month, year for CPX Research compatibility
      let birthday_day: number | null = null
      let birthday_month: number | null = null
      let birthday_year: number | null = null

      if (dateOfBirth) {
        const [year, month, day] = dateOfBirth.split("-")
        birthday_day = Number.parseInt(day, 10)
        birthday_month = Number.parseInt(month, 10)
        birthday_year = Number.parseInt(year, 10)
      }

      const tempSignupData = {
        name,
        email,
        password,
        referral_code: referralCode || null,
        birthday_day,
        birthday_month,
        birthday_year,
        gender: gender === "male" ? "m" : gender === "female" ? "f" : gender === "other" ? "o" : null,
        user_country_code: countryCode.toUpperCase() || null,
        zip_code: zipCode || null,
        device_fingerprint: deviceFingerprint,
        ip_address: ipAddress,
        user_agent: navigator.userAgent,
      }

      sessionStorage.setItem("tempSignupData", JSON.stringify(tempSignupData))

      await apiCall("/auth/request-otp", "POST", { email, purpose: "signup" })

      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email. Redirecting to verification...",
      })

      setTimeout(() => {
        router.push("/signup-otp")
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to request OTP.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">Join Survecta</CardTitle>
          <p className="text-purple-100 text-sm">Create your account and start earning</p>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 pr-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-1 text-xs">
                  <span className={isPasswordValid ? "text-green-600" : "text-red-500"}>
                    {isPasswordValid ? "✓ Password meets requirements" : "Password must be at least 8 characters"}
                  </span>
                </div>
              )}
            </div>

            {/* Referral Code */}
            <div>
              <Label htmlFor="referralCode" className="text-gray-700 font-medium">
                Referral Code (Optional)
              </Label>
              <div className="relative mt-1">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter referral code (optional)"
                />
              </div>
            </div>

            {/* Birthday */}
            <div>
              <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">
                Date of Birth
              </Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender" className="text-gray-700 font-medium">
                Gender
              </Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={isLoading}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Country Code */}
            <div>
              <Label htmlFor="countryCode" className="text-gray-700 font-medium">
                Country Code
              </Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="countryCode"
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                  disabled={isLoading}
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., US, NG, UK"
                  maxLength={2}
                />
              </div>
            </div>

            {/* ZIP Code */}
            <div>
              <Label htmlFor="zipCode" className="text-gray-700 font-medium">
                ZIP / Postal Code
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="zipCode"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter ZIP/postal code"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
