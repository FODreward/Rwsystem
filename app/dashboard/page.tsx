'use client' // This page needs to be a client component for interactive elements like buttons

import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Menu, User, History, Wallet, ReceiptText, ArrowRightLeft, KeyRound, Lock, ClipboardList, LogOut, DollarSign, CheckCircle, Hourglass, TrendingUp, Clock, Bell, Key } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { apiCall } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import dashboard sections from your provided file
import ProfileSection from "@/components/dashboard/profile-section"
import TransferHistorySection from "@/components/dashboard/transfer-history-section"
import RedeemPointsForm from "@/components/dashboard/redeem-points-form"
import RedemptionHistorySection from "@/components/dashboard/redemption-history-section"
import TransferPointsForm from "@/components/dashboard/transfer-points-form"
import ChangePasswordForm from "@/components/dashboard/change-password-form"
import ChangePinForm from "@/components/dashboard/change-pin-form"
import AvailableSurveysSection from "@/components/dashboard/available-surveys-section"

interface DashboardStats {
  points_balance: number
  completed_surveys: number
  pending_redemptions: number
  total_earned: number
  pending_points_balance: number
  is_flagged?: boolean // Added based on apiCall usage
}

interface ActivityItem {
  type: string
  message: string
  timestamp: string
}

// Inactivity timeout duration (10 minutes)
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSection = searchParams.get("section") || "dashboardHome"
  const [activeSection, setActiveSection] = useState(initialSection)
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
      // Save current section before redirecting for PIN verification
      sessionStorage.setItem("prePinVerifyPath", router.asPath || "/dashboard")
      toast({
        title: "Session Timeout",
        description: "You've been inactive. Please verify your PIN to continue.",
        variant: "destructive",
      })
      router.push("/pin-verify-login")
    }, INACTIVITY_TIMEOUT_MS)
  }, [router, toast])

  // Set up and clean up inactivity timer on component mount/unmount and activity
  useEffect(() => {
    if (!isAuthLoading && sessionStorage.getItem("accessToken")) {
      resetInactivityTimer()

      const handleActivity = () => resetInactivityTimer()

      // Add event listeners for user activity
      window.addEventListener("mousemove", handleActivity)
      window.addEventListener("keydown", handleActivity)
      window.addEventListener("click", handleActivity)
      window.addEventListener("scroll", handleActivity)

      return () => {
        // Clean up event listeners and timer
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

  // Redirect if not authenticated
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
    // Update URL query parameter to persist section on refresh
    router.replace(`/dashboard?section=${section}`, undefined, { shallow: true })
  }

  // Callback to return to dashboard home
  const handleReturnToDashboard = useCallback(() => {
    setActiveSection("dashboardHome")
    router.replace("/dashboard?section=dashboardHome", undefined, { shallow: true })
  }, [router])

  const handleLogout = () => {
    clearAuthData()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboardHome":
        return (
          <>
            {/* Welcome Message - From your provided file, styled to match approved design */}
            <section className="text-center space-y-4">
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Welcome back, {currentUser?.name || "User"}!
              </h2>
              <p className="text-xl text-gray-600">Here&apos;s what&apos;s happening with your account today.</p>
            </section>

            {/* Available Surveys - Prominent Hero Section - Using your component, wrapped in approved design */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl text-center transform transition-transform duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-center gap-5 pb-5">
                <span role="img" aria-label="party popper" className="text-5xl">{'🎉'}</span>
                <CardTitle className="text-5xl font-extrabold leading-tight">New Surveys Available!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-2xl font-medium text-blue-100 mb-6">
                  Exciting opportunities await! Click below to start earning more points.
                </p>
                {/* Your AvailableSurveysSection component, adapted to fit the button */}
                <Button 
                  className="bg-white text-blue-700 hover:bg-blue-50 text-xl px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                  onClick={() => handleMenuAction("surveys")} // Link to surveys section
                >
                  View Surveys
                </Button>
                {/* If AvailableSurveysSection has its own content, it would go here or be rendered directly */}
                {/* <AvailableSurveysSection onReturnToDashboard={handleReturnToDashboard} showReturnButton={false} /> */}
              </CardContent>
            </Card>

            {/* Dashboard Statistics - Redesigned as Circular Data Points */}
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
              {/* Wallet Balance */}
              <div className="bg-blue-50/80 backdrop-blur-sm rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform duration-200 hover:scale-[1.05] hover:shadow-xl">
                <DollarSign className="h-10 w-10 text-blue-700 mb-2" />
                <p className="text-sm text-gray-700 uppercase tracking-wide font-medium">Wallet Balance</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {isLoadingStats ? "..." : `${dashboardStats?.points_balance || 0} pts`}
                </p>
              </div>

              {/* Pending Points */}
              <div className="bg-orange-50/80 backdrop-blur-sm rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform duration-200 hover:scale-[1.05] hover:shadow-xl">
                <Hourglass className="h-10 w-10 text-orange-700 mb-2" />
                <p className="text-sm text-gray-700 uppercase tracking-wide font-medium">Pending Points</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {isLoadingStats ? "..." : `${dashboardStats?.pending_points_balance || 0} pts`}
                </p>
              </div>

              {/* Surveys Completed */}
              <div className="bg-green-50/80 backdrop-blur-sm rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform duration-200 hover:scale-[1.05] hover:shadow-xl">
                <CheckCircle className="h-10 w-10 text-green-700 mb-2" />
                <p className="text-sm text-gray-700 uppercase tracking-wide font-medium">Surveys Completed</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {isLoadingStats ? "..." : dashboardStats?.completed_surveys || 0}
                </p>
              </div>

              {/* Pending Redemptions */}
              <div className="bg-red-50/80 backdrop-blur-sm rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform duration-200 hover:scale-[1.05] hover:shadow-xl">
                <Hourglass className="h-10 w-10 text-red-700 mb-2" /> {/* Using Hourglass for pending redemptions */}
                <p className="text-sm text-gray-700 uppercase tracking-wide font-medium">Pending Redemptions</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {isLoadingStats ? "..." : dashboardStats?.pending_redemptions || 0}
                </p>
              </div>

              {/* Total Earned */}
              <div className="bg-purple-50/80 backdrop-blur-sm rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform duration-200 hover:scale-[1.05] hover:shadow-xl">
                <TrendingUp className="h-10 w-10 text-purple-700 mb-2" />
                <p className="text-sm text-gray-700 uppercase tracking-wide font-medium">Total Earned</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {isLoadingStats ? "..." : `${dashboardStats?.total_earned || 0} pts`}
                </p>
              </div>
            </section>

            {/* Activity Feed - Styled to match approved design */}
            <Card className="rounded-2xl shadow-lg border border-gray-100 bg-white">
              <CardHeader className="flex flex-row items-center gap-4 pb-5">
                <Clock className="h-7 w-7 text-gray-600" />
                <CardTitle className="text-2xl font-semibold text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-gray-200">
                {isLoadingActivity ? (
                  <p className="text-gray-500 text-lg text-center py-8">Loading your recent activities...</p>
                ) : activityFeed.length === 0 ? (
                  <p className="text-gray-500 text-lg text-center py-8">No recent activity to display.</p>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    <ul className="space-y-4">
                      {activityFeed.map((item, index) => {
                        let IconComponent: React.ElementType = Bell // Default icon
                        let iconColorClass = "text-yellow-600"

                        if (item.type === "SURVEY_COMPLETED") { IconComponent = CheckCircle; iconColorClass = "text-green-600"; }
                        else if (item.type === "REDEMPTION_REQUEST") { IconComponent = Wallet; iconColorClass = "text-blue-600"; }
                        else if (item.type === "POINTS_TRANSFER") { IconComponent = ArrowRightLeft; iconColorClass = "text-purple-600"; }
                        else if (item.type === "USER_SIGNUP") { IconComponent = User; iconColorClass = "text-teal-600"; }
                        else if (item.type === "PASSWORD_CHANGE" || item.type === "PIN_CHANGE") { IconComponent = Lock; iconColorClass = "text-gray-600"; }
                        else if (item.type === "USER_LOGIN") { IconComponent = Key; iconColorClass = "text-indigo-600"; }

                        return (
                          <li key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-3">
                            <IconComponent className={`h-6 w-6 flex-shrink-0 mt-1 ${iconColorClass}`} />
                            <div>
                              <p className="text-base font-medium text-gray-800">{item.message}</p>
                              <span className="text-sm text-gray-500">
                                {new Date(item.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )
      case "profile":
        return <ProfileSection onReturnToDashboard={handleReturnToDashboard} />
      case "history":
        return <TransferHistorySection onReturnToDashboard={handleReturnToDashboard} />
      case "redeem":
        return <RedeemPointsForm onRedeemSuccess={loadDashboardStats} onReturnToDashboard={handleReturnToDashboard} />
      case "redemptionHistory":
        return <RedemptionHistorySection onReturnToDashboard={handleReturnToDashboard} />
      case "transfer":
        return (
          <TransferPointsForm onTransferSuccess={loadDashboardStats} onReturnToDashboard={handleReturnToDashboard} />
        )
      case "password":
        return <ChangePasswordForm onReturnToDashboard={handleReturnToDashboard} />
      case "pin":
        return <ChangePinForm onReturnToDashboard={handleReturnToDashboard} />
      case "surveys":
        return (
          // When accessed from the menu, it should have the return button
          <AvailableSurveysSection onReturnToDashboard={handleReturnToDashboard} showReturnButton={true} />
        )
      default:
        return (
          <p className="text-gray-500 text-lg text-center py-8">Select an option from the menu to get started!</p>
        )
    }
  }

  if (isAuthLoading || (!sessionStorage.getItem("accessToken") && !isAuthLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-lg text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header - From your provided file */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-2xl font-extrabold text-gray-800">🎯 Survey Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="menuToggle"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              <span className="sr-only">Toggle Menu</span>
              <Menu className="lucide lucide-menu h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-white shadow-xl rounded-lg z-50">
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("profile")}
            >
              <User className="lucide lucide-user h-5 w-5" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("history")}
            >
              <History className="lucide lucide-history h-5 w-5" />
              <span>Transfer History</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("redeem")}
            >
              <Wallet className="lucide lucide-wallet h-5 w-5" />
              <span>Redeem Points</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("redemptionHistory")}
            >
              <ReceiptText className="lucide lucide-receipt-text h-5 w-5" />
              <span>Redemption History</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("transfer")}
            >
              <ArrowRightLeft className="lucide lucide-arrow-right-left h-5 w-5" />
              <span>Transfer Points</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("password")}
            >
              <KeyRound className="lucide lucide-key-round h-5 w-5" />
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("pin")}
            >
              <Lock className="lucide lucide-lock h-5 w-5" />
              <span>Change PIN</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-gray-700 transition-colors duration-150"
              onClick={() => handleMenuAction("surveys")}
            >
              <ClipboardList className="lucide lucide-clipboard-list h-5 w-5" />
              <span>Available Surveys</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem
              className="p-4 hover:bg-red-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-red-600 transition-colors duration-150"
              onClick={handleLogout}
            >
              <LogOut className="lucide lucide-log-out h-5 w-5" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <main id="mainContent" className="p-6 space-y-8 flex-1 max-w-7xl mx-auto">
        {renderSection()}
      </main>

      {/* Footer - From your provided file */}
      <footer className="text-center text-sm text-gray-500 p-6 bg-white shadow-inner mt-8">
        <p>&copy; {"2025 SurveySpark. All rights reserved."}</p>
        <p className="mt-2 space-x-4">
          <Link href="#" className="text-blue-600 hover:underline transition-colors duration-150">
            Support
          </Link>
          <Link href="#" className="text-blue-600 hover:underline transition-colors duration-150">
            Terms
          </Link>
          <Link href="#" className="text-blue-600 hover:underline transition-colors duration-150">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  )
}
