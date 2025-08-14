import { User } from "react-feather" // Import User component
import type { UserProfile } from "./types" // Import UserProfile type

interface ProfileSectionProps {
  onReturnToDashboard: () => void
  user: UserProfile // Declare user variable
}

export default function ProfileSection({ onReturnToDashboard, user }: ProfileSectionProps) {
  const formatBirthday = () => {
    if (user.birthday_day && user.birthday_month && user.birthday_year) {
      const date = new Date(user.birthday_year, user.birthday_month - 1, user.birthday_day)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    return "Not provided"
  }

  const formatGender = () => {
    if (!user.gender) return "Not provided"
    switch (user.gender.toLowerCase()) {
      case "m":
        return "Male"
      case "f":
        return "Female"
      case "o":
        return "Other"
      default:
        return user.gender
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}

        {/* Profile Overview Card */}

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-gray-900 font-medium">{formatBirthday()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="text-gray-900 font-medium">{formatGender()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <p className="text-gray-900 font-medium">{user.user_country_code?.toUpperCase() || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Zip Code</p>
                <p className="text-gray-900 font-medium">{user.zip_code || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Account Status */}

          {/* Referral Information */}

          {/* Account Timeline */}
        </div>

        {/* Points Summary Card */}
      </div>
    </div>
  )
}
