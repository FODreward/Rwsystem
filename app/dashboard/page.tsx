"use client"

import Link from "next/link"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Menu,
  User,
  History,
  Wallet,
  ReceiptText,
  ArrowRightLeft,
  KeyRound,
  Lock,
  ClipboardList,
  LogOut,
  DollarSign,
  CheckCircle,
  Hourglass,
  TrendingUp,
} from "lucide-react"
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

// Import dashboard sections
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
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                Welcome back, {currentUser?.name || "User"}!
              </h2>
              <p className="text-lg text-gray-600">Here&apos;s what&apos;s happening with your account today</p>
            </div>

            {/* Dashboard Stats Grid */}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Wallet Balance Card */}
  <Card className="bg-background p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <div className="bg-primary-100 p-3 rounded-full mb-3">
      <DollarSign className="h-8 w-8 text-primary-600" />
    </div>
    <CardTitle className="text-xl font-semibold text-gray-800 mb-1">Wallet Balance</CardTitle>
    <CardContent className="p-0 text-3xl font-bold text-primary-600">
      {isLoadingStats ? "..." : `${dashboardStats?.points_balance || 0} pts`}
    </CardContent>
  </Card>

  {/* Pending Points Card */}
  <Card className="bg-background p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <div className="bg-primary-100 p-3 rounded-full mb-3">
      <Hourglass className="h-8 w-8 text-primary-600" />
    </div>
    <CardTitle className="text-xl font-semibold text-gray-800 mb-1">Pending Points</CardTitle>
    <CardContent className="p-0 text-3xl font-bold text-primary-600">
      {isLoadingStats ? "..." : `${dashboardStats?.pending_points || 0} pts`}
    </CardContent>
  </Card>

  {/* Surveys Completed Card */}
  <Card className="bg-background p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <div className="bg-primary-100 p-3 rounded-full mb-3">
      <CheckCircle className="h-8 w-8 text-primary-600" />
    </div>
    <CardTitle className="text-xl font-semibold text-gray-800 mb-1">Surveys Completed</CardTitle>
    <CardContent className="p-0 text-3xl font-bold text-primary-600">
      {isLoadingStats ? "..." : dashboardStats?.completed_surveys || 0}
    </CardContent>
  </Card>

  {/* Pending Redemptions Card */}
  <Card className="bg-background p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <div className="bg-primary-100 p-3 rounded-full mb-3">
      <Hourglass className="h-8 w-8 text-primary-600" />
    </div>
    <CardTitle className="text-xl font-semibold text-gray-800 mb-1">Pending Redemptions</CardTitle>
    <CardContent className="p-0 text-3xl font-bold text-primary-600">
      {isLoadingStats ? "..." : dashboardStats?.pending_redemptions || 0}
    </CardContent>
  </Card>

  {/* Total Earned Card */}
  <Card className="bg-background p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <div className="bg-primary-100 p-3 rounded-full mb-3">
      <TrendingUp className="h-8 w-8 text-primary-600" />
    </div>
    <CardTitle className="text-xl font-semibold text-gray-800 mb-1">Total Earned</CardTitle>
    <CardContent className="p-0 text-3xl font-bold text-primary-600">
      {isLoadingStats ? "..." : `${dashboardStats?.total_earned || 0} pts`}
    </CardContent>
  </Card>
</section>
            

            {/* Available Surveys Section (on dashboard home - no extra wrapper) */}
            <AvailableSurveysSection onReturnToDashboard={handleReturnToDashboard} showReturnButton={false} />

            {/* Activity Feed */}
            <Card className="bg-card-background p-6 rounded-2xl shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary">🕒 Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingActivity ? (
                  <p className="text-text-secondary text-lg text-center py-8">Loading your recent activities...</p>
                ) : activityFeed.length === 0 ? (
                  <p className="text-text-secondary text-lg text-center py-8">No recent activity to display.</p>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    <ul className="space-y-4">
                      {activityFeed.map((item, index) => {
                        let emoji = "🔔"
                        if (item.type === "SURVEY_COMPLETED") emoji = "✅"
                        else if (item.type === "REDEMPTION_REQUEST") emoji = "💳"
                        else if (item.type === "POINTS_TRANSFER") emoji = "📤"
                        else if (item.type === "USER_SIGNUP") emoji = "📥"
                        else if (item.type === "PASSWORD_CHANGE" || item.type === "PIN_CHANGE") emoji = "⚙️"
                        else if (item.type === "USER_LOGIN") emoji = "🔑"

                        return (
                          <li key={index} className="bg-background p-4 rounded-lg shadow-sm flex items-start space-x-3">
                            <span className="text-xl">{emoji}</span>
                            <div>
                              <p className="text-base font-medium text-text-primary">{item.message}</p>
                              <span className="text-sm text-text-secondary">
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
          <p className="text-text-secondary text-lg text-center py-8">Select an option from the menu to get started!</p>
        )
    }
  }

  if (isAuthLoading || (!sessionStorage.getItem("accessToken") && !isAuthLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-lg text-text-secondary">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="bg-background text-text-primary min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card-background shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-2xl font-extrabold text-primary">🎯 Survey Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="menuToggle"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
            >
              <span className="sr-only">Toggle Menu</span>
              <Menu className="lucide lucide-menu h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-card-background shadow-xl rounded-lg z-50">
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("profile")}
            >
              <User className="lucide lucide-user h-5 w-5" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("history")}
            >
              <History className="lucide lucide-history h-5 w-5" />
              <span>Transfer History</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("redeem")}
            >
              <Wallet className="lucide lucide-wallet h-5 w-5" />
              <span>Redeem Points</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("redemptionHistory")}
            >
              <ReceiptText className="lucide lucide-receipt-text h-5 w-5" />
              <span>Redemption History</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("transfer")}
            >
              <ArrowRightLeft className="lucide lucide-arrow-right-left h-5 w-5" />
              <span>Transfer Points</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border-light" />
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("password")}
            >
              <KeyRound className="lucide lucide-key-round h-5 w-5" />
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("pin")}
            >
              <Lock className="lucide lucide-lock h-5 w-5" />
              <span>Change PIN</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
              onClick={() => handleMenuAction("surveys")}
            >
              <ClipboardList className="lucide lucide-clipboard-list h-5 w-5" />
              <span>Available Surveys</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border-light" />
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
      <main id="mainContent" className="p-6 space-y-8 flex-1">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-text-secondary p-6 bg-card-background shadow-inner mt-8">
        <p>&copy; {"2025 SurveySpark. All rights reserved."}</p>
        <p className="mt-2 space-x-4">
          <Link href="#" className="text-primary hover:underline transition-colors duration-150">
            Support
          </Link>
          <Link href="#" className="text-primary hover:underline transition-colors duration-150">
            Terms
          </Link>
          <Link href="#" className="text-primary hover:underline transition-colors duration-150">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  )
}
