"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Menu,
  X,
  Target,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle,
  Hourglass,
  Trophy,
  Gift,
  MousePointer,
  BarChart3,
  VoteIcon as Poll,
  History,
  UserCircle,
  Headphones,
  LogOut,
  User,
  ArrowRightLeft,
  Lock,
  Bell,
  Key,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiCall } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface DashboardStats {
  points_balance: number
  completed_surveys: number
  pending_redemptions: number
  total_earned: number
  pending_points_balance: number
  is_flagged?: boolean
}

interface ActivityItem {
  type: string
  message: string
  timestamp: string
}

// Inactivity timeout duration (10 minutes)
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000

export default function SurveySpark() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSection = searchParams.get("section") || "dashboardHome"
  const [activeSection, setActiveSection] = useState(initialSection)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([])
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [isLoadingActivity, setIsLoadingActivity] = useState(true)

  const { clearAuthData, isLoading: isAuthLoading, currentUser } = useAuth()
  const { toast } = useToast()

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Function to reset the inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    inactivityTimerRef.current = setTimeout(() => {
      sessionStorage.setItem("prePinVerifyPath", window.location.pathname + window.location.search)
      toast({
        title: "Session Timeout",
        description: "You've been inactive. Please verify your PIN to continue.",
        variant: "destructive",
      })
      router.push("/pin-verify-login")
    }, INACTIVITY_TIMEOUT_MS)
  }, [router, toast])

  useEffect(() => {
    if (!isAuthLoading && sessionStorage.getItem("accessToken")) {
      resetInactivityTimer()

      const handleActivity = () => resetInactivityTimer()

      window.addEventListener("mousemove", handleActivity)
      window.addEventListener("keydown", handleActivity)
      window.addEventListener("click", handleActivity)
      window.addEventListener("scroll", handleActivity)

      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current)
        }
        window.removeEventListener("mousemove", handleActivity)
        window.removeEventListener("keydown", handleActivity)
        window.removeEventListener("click", handleActivity)
        window.removeEventListener("scroll", handleActivity)
      }
    }
  }, [isAuthLoading, resetInactivityTimer])

  useEffect(() => {
    if (!isAuthLoading && !sessionStorage.getItem("accessToken")) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [isAuthLoading, router, toast])

  const loadDashboardStats = useCallback(async () => {
    setIsLoadingStats(true)
    try {
      const data = await apiCall<DashboardStats>("/dashboard/stats", "GET", null, true)

      if (data?.is_flagged) {
        alert("⚠️ Your account is temporarily restricted due to suspicious activity. Please contact support.")
      }

      setDashboardStats(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load dashboard stats.",
        variant: "destructive",
      })
      setDashboardStats(null)
    } finally {
      setIsLoadingStats(false)
    }
  }, [toast])

  const loadActivity = useCallback(async () => {
    setIsLoadingActivity(true)
    try {
      const data = await apiCall<ActivityItem[]>("/dashboard/activity", "GET", null, true)
      setActivityFeed(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load activity feed.",
        variant: "destructive",
      })
      setActivityFeed([])
    } finally {
      setIsLoadingActivity(false)
    }
  }, [toast])

  useEffect(() => {
    if (!isAuthLoading && sessionStorage.getItem("accessToken")) {
      loadDashboardStats()
      loadActivity()
    }
  }, [isAuthLoading, loadDashboardStats, loadActivity])

  const handleMenuAction = (section: string) => {
    setActiveSection(section)
    setSidebarOpen(false)
    router.replace(`/dashboard?section=${section}`, undefined, { shallow: true })
  }

  const handleLogout = () => {
    clearAuthData()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const handleSurveyClick = () => {
    handleMenuAction("surveys")
  }

  if (isAuthLoading || (!sessionStorage.getItem("accessToken") && !isAuthLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-lg text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar Overlay */}
      <div
        className={`overlay-transition fixed inset-0 bg-black bg-opacity-50 z-40 ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`sidebar-transition fixed left-0 top-0 h-full w-80 glass-effect z-50 p-6 ${sidebarOpen ? "open" : ""}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <BarChart3 className="text-white text-lg" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">SurveySpark</h2>
              <span className="premium-badge text-xs px-2 py-1 rounded-full font-semibold">PRO</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="text-gray-600" />
          </button>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => handleMenuAction("dashboardHome")}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium ${
              activeSection === "dashboardHome" ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <TrendingUp size={20} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => handleMenuAction("surveys")}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700"
          >
            <Poll size={20} />
            <span>Available Surveys</span>
          </button>
          <button
            onClick={() => handleMenuAction("wallet")}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700"
          >
            <Wallet size={20} />
            <span>Wallet & Rewards</span>
          </button>
          <button
            onClick={() => handleMenuAction("history")}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700"
          >
            <History size={20} />
            <span>Survey History</span>
          </button>
          <button
            onClick={() => handleMenuAction("profile")}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700"
          >
            <UserCircle size={20} />
            <span>Profile Settings</span>
          </button>
          <button
            onClick={() => handleMenuAction("support")}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700"
          >
            <Headphones size={20} />
            <span>Support Center</span>
          </button>
          <div className="border-t border-gray-200 my-4"></div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-100 text-red-600"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="text-gray-700 text-lg" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={20} />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Survey Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></div>
                <span className="text-sm font-medium text-green-700">Online</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentUser?.name?.charAt(0) || "U"}</span>
                </div>
                <span className="font-medium text-gray-900">{currentUser?.name || "User"}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "dashboardHome" && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {currentUser?.name || "User"}! 👋
                  </h2>
                  <p className="text-gray-600 text-lg">Here's your earning summary and latest opportunities</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last login</p>
                  <p className="font-semibold text-gray-900">Today, 1:15 AM</p>
                </div>
              </div>
            </div>

            {/* Survey Opportunities Banner */}
            <div
              className="survey-banner card-hover rounded-2xl p-8 mb-8 text-white cursor-pointer relative z-10"
              onClick={handleSurveyClick}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                      <Gift size={48} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Premium Surveys Available!</h3>
                      <p className="text-white text-opacity-90">High-value opportunities with bonus rewards</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2">
                      <p className="text-sm opacity-90">Potential Earnings</p>
                      <p className="text-2xl font-bold">+150 pts</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MousePointer size={20} />
                  <span className="text-white text-opacity-90">Click to explore premium surveys</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {/* Wallet Balance */}
              <div className="metric-card card-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <Wallet className="text-white text-lg" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">Wallet Balance</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoadingStats ? "..." : dashboardStats?.points_balance || 0}
                </p>
                <p className="text-sm text-gray-500">points available</p>
              </div>

              {/* Pending Points */}
              <div className="metric-card card-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Hourglass className="text-white text-lg" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                      Pending
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">Pending Points</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoadingStats ? "..." : dashboardStats?.pending_points_balance || 0}
                </p>
                <p className="text-sm text-gray-500">processing</p>
              </div>

              {/* Surveys Completed */}
              <div className="metric-card card-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-white text-lg" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      +1 Today
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">Completed</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoadingStats ? "..." : dashboardStats?.completed_surveys || 0}
                </p>
                <p className="text-sm text-gray-500">this month</p>
              </div>

              {/* Pending Redemptions */}
              <div className="metric-card card-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <Clock className="text-white text-lg" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">None</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">Redemptions</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoadingStats ? "..." : dashboardStats?.pending_redemptions || 0}
                </p>
                <p className="text-sm text-gray-500">pending</p>
              </div>

              {/* Total Earned */}
              <div className="metric-card card-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Trophy className="text-white text-lg" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium">
                      Lifetime
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">Total Earned</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoadingStats ? "..." : dashboardStats?.total_earned || 0}
                </p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All</button>
              </div>

              <div className="activity-timeline">
                {isLoadingActivity ? (
                  <p className="text-gray-500 text-center py-8">Loading your recent activities...</p>
                ) : activityFeed.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No recent activity to display.</p>
                ) : (
                  activityFeed.map((activity, index) => {
                    let IconComponent: React.ElementType = Bell
                    let iconColorClass = "text-yellow-600"

                    if (activity.type === "SURVEY_COMPLETED") {
                      IconComponent = CheckCircle
                      iconColorClass = "text-green-600"
                    } else if (activity.type === "REDEMPTION_REQUEST") {
                      IconComponent = Wallet
                      iconColorClass = "text-blue-600"
                    } else if (activity.type === "POINTS_TRANSFER") {
                      IconComponent = ArrowRightLeft
                      iconColorClass = "text-purple-600"
                    } else if (activity.type === "USER_SIGNUP") {
                      IconComponent = User
                      iconColorClass = "text-teal-600"
                    } else if (activity.type === "PASSWORD_CHANGE" || activity.type === "PIN_CHANGE") {
                      IconComponent = Lock
                      iconColorClass = "text-gray-600"
                    } else if (activity.type === "USER_LOGIN") {
                      IconComponent = Key
                      iconColorClass = "text-indigo-600"
                    }

                    return (
                      <div key={index} className="activity-item">
                        <div className="activity-dot"></div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <IconComponent className={`h-5 w-5 ${iconColorClass}`} />
                              <div>
                                <p className="font-semibold text-gray-900">{activity.message}</p>
                                <span className="text-xs text-gray-500">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </>
        )}

        {/* Other sections placeholder */}
        {activeSection !== "dashboardHome" && (
          <div className="glass-effect rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
            </h3>
            <p className="text-gray-600 mb-6">This section is under development.</p>
            <Button onClick={() => handleMenuAction("dashboardHome")} className="gradient-bg text-white">
              Return to Dashboard
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">SurveySpark</h3>
                  <span className="premium-badge text-xs px-2 py-1 rounded-full font-semibold">PRO</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Transform your opinions into rewards with our premium survey platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Available Surveys
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Rewards Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Profile Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; 2025 SurveySpark Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
