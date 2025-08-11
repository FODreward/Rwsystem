"use client"

import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
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

interface DashboardStats {
  points_balance: number
  pending_points_balance: number
  completed_surveys: number
  pending_redemptions: number
  total_earned: number
  name: string
  email: string
  created_at: string
}

interface ActivityItem {
  id: string
  description: string
  created_at: string
}

const emojiMap: { [key: string]: string } = {
  survey_completed: "✅",
  points_redeemed: "💰",
  points_transferred: "💸",
  profile_updated: "👤",
  login: "🔑",
}

export default function SurveySparkPro() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSurveyModal, setShowSurveyModal] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboardHome")
  const [isTimedOut, setIsTimedOut] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Function to reset the timeout
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(
      () => {
        setIsTimedOut(true)
        // Redirect to the login page or any other appropriate route
        router.push("/login")
      },
      10 * 60 * 1000,
    ) // 10 minutes
  }

  useEffect(() => {
    // Set initial section from URL params
    const sectionParam = searchParams.get("section")
    if (sectionParam) {
      setActiveSection(sectionParam)
    }

    // Reset timeout on component mount and on every activity
    resetTimeout()

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimeout)
    window.addEventListener("keypress", resetTimeout)

    return () => {
      // Clear timeout on component unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Remove event listeners
      window.removeEventListener("mousemove", resetTimeout)
      window.removeEventListener("keypress", resetTimeout)
    }
  }, [])

  // Fetch dashboard data
  const {
    data: dashboardStats,
    isLoading: isStatsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery<DashboardStats>({
    queryKey: ["/dashboard/stats"],
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
    queryKey: ["/dashboard/activity"],
    queryFn: async () => {
      return await apiCall<ActivityItem[]>("/dashboard/activity", "GET", null, true)
    },
  })

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const openSurveyModal = () => setShowSurveyModal(true)
  const closeSurveyModal = () => setShowSurveyModal(false)
  const handleMenuAction = (section: string) => {
    setActiveSection(section)
    setSidebarOpen(false)
    // Update URL query parameter
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("section", section)
    router.push(`?${newParams.toString()}`, { scroll: false })
  }

  const handleSuccess = () => {
    refetchStats() // Refresh dashboard data after successful operations
    refetchActivity()
  }

  // Format activity time ago
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
      case "support":
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">🎧 Support Center</h3>
              <button
                onClick={() => handleMenuAction("dashboardHome")}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">📧 Contact Support</h4>
                <p className="text-gray-600">Email: support@surveyspark.com</p>
                <p className="text-gray-600">Response time: 24-48 hours</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">❓ Frequently Asked Questions</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• How do I complete a survey?</li>
                  <li>• When will I receive my points?</li>
                  <li>• How do I redeem my points?</li>
                  <li>• What payment methods are available?</li>
                </ul>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <>
            {/* Dashboard Home Content */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {dashboardStats?.name || "User"}! 👋
                  </h2>
                  <p className="text-gray-600 text-lg">Here's your earning summary and latest opportunities</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last login</p>
                  <p className="font-semibold text-gray-900">
                    {activityData?.[0]?.created_at ? formatTimeAgo(new Date(activityData[0].created_at)) : "Recently"}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm font-medium">Wallet Balance</p>
                    <p className="text-3xl font-bold">{dashboardStats?.points_balance || 0}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                    <i className="fas fa-wallet text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Pending Points</p>
                    <p className="text-3xl font-bold">{dashboardStats?.pending_points_balance || 0}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                    <i className="fas fa-hourglass-half text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Surveys Completed</p>
                    <p className="text-3xl font-bold">{dashboardStats?.completed_surveys || 0}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                    <i className="fas fa-check-circle text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Pending Redemptions</p>
                    <p className="text-3xl font-bold">{dashboardStats?.pending_redemptions || 0}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                    <i className="fas fa-exclamation-triangle text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm font-medium">Total Earned</p>
                    <p className="text-3xl font-bold">{dashboardStats?.total_earned || 0}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                    <i className="fas fa-coins text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Survey Opportunities and Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Survey Opportunities */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Survey Opportunities</span>
                </h3>
                <div className="space-y-4">
                  {/* Placeholder for survey opportunities - replace with actual data */}
                  <p className="text-gray-600">No survey opportunities available at the moment.</p>
                </div>
                <button
                  onClick={openSurveyModal}
                  className="w-full mt-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-medium"
                >
                  View All Surveys
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Recent Activity</span>
                </h3>
                <div className="space-y-4">
                  {activityData && activityData.length > 0 ? (
                    activityData.slice(0, 5).map((activity) => {
                      // Safe check for description
                      const description = activity?.description || "Activity occurred"
                      const activityType = description.toLowerCase().includes("survey")
                        ? "survey_completed"
                        : description.toLowerCase().includes("redeem")
                          ? "points_redeemed"
                          : description.toLowerCase().includes("transfer")
                            ? "points_transferred"
                            : description.toLowerCase().includes("profile")
                              ? "profile_updated"
                              : description.toLowerCase().includes("login")
                                ? "login"
                                : "default"

                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <span className="text-sm">{emojiMap[activityType] || "🔔"}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{description}</p>
                            <p className="text-gray-500 text-sm">
                              {activity?.created_at ? formatTimeAgo(new Date(activity.created_at)) : "Recently"}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-inbox text-gray-400 text-2xl"></i>
                      </div>
                      <p className="text-gray-600">No recent activity to display.</p>
                    </div>
                  )}
                </div>
                <button className="w-full mt-4 py-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors font-medium">
                  View All Activity
                </button>
              </div>
            </div>
          </>
        )
    }
  }

  // Loading state
  if (isStatsLoading || isActivityLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
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
          <button
            onClick={() => {
              refetchStats()
              refetchActivity()
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // If no dashboard stats, show loading
  if (!dashboardStats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar} />}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-chart-line text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-900">SurveySpark</h1>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    PRO
                  </span>
                </div>
              </div>
              <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => handleMenuAction("dashboardHome")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "dashboardHome"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handleMenuAction("surveys")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "surveys"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-poll"></i>
                <span>Available Surveys</span>
              </button>
              <button
                onClick={() => handleMenuAction("profile")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "profile"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-user-circle"></i>
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => handleMenuAction("redeem")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "redeem"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-wallet"></i>
                <span>Redeem Points</span>
              </button>
              <button
                onClick={() => handleMenuAction("transfer")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "transfer"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-exchange-alt"></i>
                <span>Transfer Points</span>
              </button>
              <button
                onClick={() => handleMenuAction("transferHistory")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "transferHistory"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-history"></i>
                <span>Transfer History</span>
              </button>
              <button
                onClick={() => handleMenuAction("redemptionHistory")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "redemptionHistory"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-receipt"></i>
                <span>Redemption History</span>
              </button>
              <button
                onClick={() => handleMenuAction("changePin")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "changePin"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-lock"></i>
                <span>Change PIN</span>
              </button>
              <button
                onClick={() => handleMenuAction("changePassword")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "changePassword"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-key"></i>
                <span>Change Password</span>
              </button>
              <button
                onClick={() => handleMenuAction("support")}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeSection === "support"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <i className="fas fa-headset"></i>
                <span>Support Center</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:ml-80">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                  <i className="fas fa-bars text-gray-600"></i>
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {activeSection === "dashboardHome"
                      ? "Dashboard Overview"
                      : activeSection === "surveys"
                        ? "Available Surveys"
                        : activeSection === "profile"
                          ? "Profile Settings"
                          : activeSection === "redeem"
                            ? "Redeem Points"
                            : activeSection === "transfer"
                              ? "Transfer Points"
                              : activeSection === "transferHistory"
                                ? "Transfer History"
                                : activeSection === "redemptionHistory"
                                  ? "Redemption History"
                                  : activeSection === "changePin"
                                    ? "Change PIN"
                                    : activeSection === "changePassword"
                                      ? "Change Password"
                                      : activeSection === "support"
                                        ? "Support Center"
                                        : "Dashboard"}
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{dashboardStats?.name || "User"}</p>
                  <p className="text-xs text-gray-600">{dashboardStats?.points_balance || 0} points</p>
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-indigo-600"></i>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">{renderSection()}</main>
        </div>

        {/* Survey Modal */}
        {showSurveyModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeSurveyModal()}
          >
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Available Surveys</h3>
                  <p className="text-gray-600 mt-1">Choose a survey to start earning points</p>
                </div>
                <button onClick={closeSurveyModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <i className="fas fa-times text-gray-600"></i>
                </button>
              </div>

              <div className="space-y-4">
                {/* Placeholder for survey list - replace with actual data */}
                <p className="text-gray-600">No surveys available at the moment.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>
                      Total available surveys: <span className="font-medium">0</span>
                    </p>
                    <p>
                      Potential earnings: <span className="font-medium text-green-600">0 points</span>
                    </p>
                  </div>
                  <button
                    onClick={closeSurveyModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
