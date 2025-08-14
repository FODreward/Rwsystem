"use client"

import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { Menu, ChevronRight, Gift, Wallet, Clock, CheckCircle, RotateCcw, Trophy } from "lucide-react"
import AvailableSurveysSection from "@/components/surveyspark/AvailableSurveysSection"
import ProfileSection from "@/components/surveyspark/ProfileSection"
import RedeemPointsForm from "@/components/surveyspark/RedeemPointsForm"
import TransferPointsForm from "@/components/surveyspark/TransferPointsForm"
import TransferHistorySection from "@/components/surveyspark/TransferHistorySection"
import RedemptionHistorySection from "@/components/surveyspark/RedemptionHistorySection"
import ChangePinForm from "@/components/surveyspark/ChangePinForm"
import ChangePasswordForm from "@/components/surveyspark/ChangePasswordForm"
import { apiCall } from "@/lib/api"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface DashboardStats {
  email: string
  name?: string
  status: string
  points_balance: number
  pending_points_balance?: number
  completed_surveys?: number
  pending_redemptions?: number
  total_earned?: number
  referral_code?: string
  email_verified: boolean
  is_admin: boolean
  is_agent: boolean
  created_at: string
}

interface ActivityItem {
  id: string
  type: string
  message: string
  timestamp: string
}

export default function SurveySparkPro() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboardHome")
  const [isTimedOut, setIsTimedOut] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAllActivities, setShowAllActivities] = useState(false)
  const { toast } = useToast()
  const { currentUser, clearAuthData } = useAuth()

  // Function to reset the timeout
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(
      () => {
        // Save current section and path before redirecting for PIN verification
        sessionStorage.setItem("prePinVerifyPath", `/dashboard?section=${activeSection}`)
        toast({
          title: "Session Timeout",
          description: "You've been inactive. Please verify your PIN to continue.",
          variant: "destructive",
        })
        router.push("/pin-verify-login")
      },
      10 * 60 * 1000, // 10 minutes
    )
  }

  useEffect(() => {
    // Handle section persistence on page refresh
    const sectionParam = searchParams.get("section")
    if (sectionParam) {
      setActiveSection(sectionParam)
    } else {
      // If no section param, default to dashboardHome but update URL
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set("section", "dashboardHome")
      router.replace(`?${newParams.toString()}`, { scroll: false })
    }

    // Set up inactivity timeout
    resetTimeout()

    const handleActivity = () => resetTimeout()

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)
    window.addEventListener("click", handleActivity)
    window.addEventListener("scroll", handleActivity)
    window.addEventListener("touchstart", handleActivity)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      window.removeEventListener("click", handleActivity)
      window.removeEventListener("scroll", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
    }
  }, [searchParams, router])

  // Fetch dashboard data
  const {
    data: dashboardStats,
    isLoading: isStatsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    queryFn: async () => {
      return await apiCall<DashboardStats>("/dashboard/stats", "GET", null, true)
    },
  })

  const {
    data: activityData,
    isLoading: isActivityLoading,
    error: activityError,
    refetch: refetchActivity,
  } = useQuery<ActivityItem[]>({
    queryKey: ["/api/dashboard/activity"],
    queryFn: async () => {
      return await apiCall<ActivityItem[]>("/dashboard/activity", "GET", null, true)
    },
  })

  useEffect(() => {
    if (dashboardStats) {
      console.log("Dashboard Stats:", dashboardStats)
      console.log("User Name:", dashboardStats.name)
    }
  }, [dashboardStats])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleMenuAction = (section: string) => {
    setActiveSection(section)
    setSidebarOpen(false)
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("section", section)
    router.push(`?${newParams.toString()}`, { scroll: false })
  }

  const handleSuccess = () => {
    refetchStats()
    refetchActivity()
  }

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - new Date(date).getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    const diffInDays = diffInHours / 24

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) > 1 ? "s" : ""} ago`
    } else {
      return `${Math.floor(diffInDays)} day${Math.floor(diffInDays) > 1 ? "s" : ""} ago`
    }
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getUserDisplayName = (fullName?: string) => {
    if (!fullName || fullName.trim() === "") return "User"
    const names = fullName.trim().split(" ")
    return names[0] // Return first name only
  }

  const getUserInitials = (fullName?: string) => {
    if (!fullName || fullName.trim() === "") return "U"
    const names = fullName
      .trim()
      .split(" ")
      .filter((name) => name.length > 0)
    if (names.length === 0) return "U"
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const renderSection = () => {
    if (!dashboardStats) return null

    switch (activeSection) {
      case "surveys":
        return (
          <AvailableSurveysSection
            onReturnToDashboard={() => handleMenuAction("dashboardHome")}
            showReturnButton={true}
          />
        )
      case "profile":
        return <ProfileSection onReturnToDashboard={() => handleMenuAction("dashboardHome")} />
      case "redeem":
        return (
          <RedeemPointsForm
            onRedeemSuccess={handleSuccess}
            onReturnToDashboard={() => handleMenuAction("dashboardHome")}
          />
        )
      case "transfer":
        return (
          <TransferPointsForm
            onTransferSuccess={handleSuccess}
            onReturnToDashboard={() => handleMenuAction("dashboardHome")}
          />
        )
      case "transferHistory":
        return <TransferHistorySection onReturnToDashboard={() => handleMenuAction("dashboardHome")} />
      case "redemptionHistory":
        return <RedemptionHistorySection onReturnToDashboard={() => handleMenuAction("dashboardHome")} />
      case "changePin":
        return <ChangePinForm onReturnToDashboard={() => handleMenuAction("dashboardHome")} />
      case "changePassword":
        return <ChangePasswordForm onReturnToDashboard={() => handleMenuAction("dashboardHome")} />
      default:
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-2">
                  <Menu className="h-5 w-5 text-gray-600" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <span className="font-semibold text-gray-900">Survecta Dashboard</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{getUserInitials(currentUser?.name)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{getUserDisplayName(currentUser?.name)}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-4 py-6 space-y-6">
              {/* Welcome Section */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Welcome back, {getUserDisplayName(currentUser?.name)}! 👋
                  </h1>
                  <p className="text-gray-600">Here's your earning summary and latest opportunities</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-500">Last login</p>
                  <p className="font-semibold text-gray-900">Today, {getCurrentTime()}</p>
                </div>
              </div>

              {/* Premium Surveys Card */}
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white cursor-pointer"
                onClick={() => handleMenuAction("surveys")}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gift className="h-6 w-6" />
                      <h3 className="text-xl font-bold">Premium Surveys Available!</h3>
                    </div>
                    <p className="text-purple-100 mb-4">High-value opportunities with bonus rewards</p>
                    <div className="flex items-center space-x-1 text-purple-100">
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-sm">Click to explore premium surveys</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-200 text-sm">Potential Earnings</p>
                    <p className="text-2xl font-bold">+150</p>
                    <p className="text-purple-200 text-sm">pts</p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="space-y-4">
                {/* Wallet Balance */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Wallet Balance</span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats?.points_balance || 0}</p>
                    <p className="text-gray-500 text-sm">points available</p>
                  </div>
                </div>

                {/* Pending Points */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Pending Points</span>
                    </div>
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                      Pending
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats?.pending_points_balance || 0}</p>
                    <p className="text-gray-500 text-sm">processing</p>
                  </div>
                </div>

                {/* Completed Surveys */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Completed</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      + Today
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats?.completed_surveys || 0}</p>
                    <p className="text-gray-500 text-sm">this month</p>
                  </div>
                </div>

                {/* Redemptions */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <RotateCcw className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Redemptions</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">All</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats?.pending_redemptions || 0}</p>
                    <p className="text-gray-500 text-sm">pending</p>
                  </div>
                </div>

                {/* Total Earned */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 border-2 border-dashed border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-pink-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Total Earned</span>
                    </div>
                    <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full font-medium">
                      Lifetime
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats?.total_earned || 0}</p>
                    <p className="text-gray-500 text-sm">points</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700"
                    onClick={() => setShowAllActivities(!showAllActivities)}
                  >
                    {showAllActivities ? "Show Less" : "View All"}
                  </Button>
                </div>

                <div className="space-y-4">
                  {activityData && activityData.length > 0 ? (
                    activityData.slice(0, showAllActivities ? 10 : 5).map((activity, index) => {
                      // Use exact message from backend without modification
                      const description = activity?.message || "Activity occurred"
                      const createdAt = activity?.timestamp ? new Date(activity.timestamp) : new Date()

                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="relative">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            {index <
                              (showAllActivities
                                ? Math.min(activityData.length - 1, 9)
                                : Math.min(activityData.length - 1, 4)) && (
                              <div className="absolute top-3 left-1.5 w-0.5 h-8 bg-gray-200"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{description}</p>
                            <p className="text-sm text-gray-500">
                              {createdAt.toLocaleDateString("en-US", {
                                month: "numeric",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No recent activity to display.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleSidebar}>
                <div className="bg-gray-50 w-80 h-full shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                  {/* Header with gradient background - fixed at top */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm font-bold">M</span>
                        </div>
                        <h2 className="text-lg font-bold text-white">Menu</h2>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="text-white hover:bg-white hover:bg-opacity-20"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <nav className="p-3 space-y-1 pb-3">
                      <button
                        onClick={() => handleMenuAction("dashboardHome")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <span className="text-orange-600 text-sm">🏠</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Dashboard</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("surveys")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-blue-600 text-sm">📊</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Available Surveys</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("profile")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                            <span className="text-purple-600 text-sm">👤</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Profile Settings</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("redeem")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-green-600 text-sm">💰</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Redeem Points</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("transfer")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <span className="text-indigo-600 text-sm">💸</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Transfer Points</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("transferHistory")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <span className="text-yellow-600 text-sm">📜</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Transfer History</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("redemptionHistory")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center">
                            <span className="text-teal-600 text-sm">🧾</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Redemption History</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("changePin")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-gray-600 text-sm">🔒</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Change PIN</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuAction("changePassword")}
                        className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center">
                            <span className="text-pink-600 text-sm">🔐</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">Change Password</span>
                        </div>
                      </button>

                      <div className="pt-2 border-t border-gray-200 mt-3">
                        <button
                          onClick={() => {
                            clearAuthData()
                            toast({
                              title: "Logged Out",
                              description: "You have been successfully logged out.",
                            })
                            router.push("/login")
                          }}
                          className="w-full bg-red-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-red-100 hover:bg-red-100"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                              <span className="text-red-600 text-sm">🚪</span>
                            </div>
                            <span className="font-medium text-red-600 text-sm">Logout</span>
                          </div>
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  // Loading state
  if (isStatsLoading || isActivityLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (statsError || activityError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">Failed to load dashboard data</p>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
          <Button
            onClick={() => {
              refetchStats()
              refetchActivity()
            }}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return renderSection()
}
