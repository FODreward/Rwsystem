"use client"

import { useEffect, useState } from "react"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface UserProfile {
  email: string
  name?: string
  status: string
  points_balance: number
  referral_code?: string
  email_verified: boolean
  is_admin: boolean
  is_agent: boolean
  created_at: string
}

export default function ProfileSection({ onReturnToDashboard }: { onReturnToDashboard: () => void }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true)
      try {
        const data = await apiCall<UserProfile>("/users/me", "GET", null, true)
        setUser(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load profile.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [toast])

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center justify-center min-h-[200px] text-gray-500 text-lg">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center justify-center min-h-[200px] text-red-500 text-lg">
          Failed to load profile.
          <Button onClick={onReturnToDashboard} variant="outline" className="ml-4 bg-transparent">
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <span>👤</span>
          <span>Your Profile</span>
        </h3>
        <Button onClick={onReturnToDashboard} variant="outline">
          Return to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
        <p>
          <strong className="text-gray-900">Email:</strong> <span className="text-gray-600">{user.email}</span>
        </p>
        <p>
          <strong className="text-gray-900">Full Name:</strong>{" "}
          <span className="text-gray-600">{user.name || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-900">Status:</strong>{" "}
          <span className="text-gray-600 capitalize">{user.status}</span>
        </p>
        <p>
          <strong className="text-gray-900">Points Balance:</strong>{" "}
          <span className="text-gray-600">{user.points_balance} pts</span>
        </p>
        <p>
          <strong className="text-gray-900">Referral Code:</strong>{" "}
          <span className="text-gray-600">{user.referral_code || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-900">Email Verified:</strong>{" "}
          <span className="text-gray-600">{user.email_verified ? "Yes ✅" : "No ❌"}</span>
        </p>
        <p>
          <strong className="text-gray-900">Admin:</strong>{" "}
          <span className="text-gray-600">{user.is_admin ? "Yes" : "No"}</span>
        </p>
        <p>
          <strong className="text-gray-900">Agent:</strong>{" "}
          <span className="text-gray-600">{user.is_agent ? "Yes" : "No"}</span>
        </p>
        <p className="col-span-full">
          <strong className="text-gray-900">Created At:</strong>{" "}
          <span className="text-gray-600">{new Date(user.created_at).toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}
