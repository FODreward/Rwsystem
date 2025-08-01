"use client"

import Link from "next/link"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiCall } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

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

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboardHome")
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([])
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [isLoadingActivity, setIsLoadingActivity] = useState(true)

  const { clearAuthData, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const menuRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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

  // Effect for click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

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
    setIsMenuOpen(false)
  }

  // Callback to return to dashboard home
  const handleReturnToDashboard = useCallback(() => {
    setActiveSection("dashboardHome")
  }, [])

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
            {/* Dashboard Overview */}
            <section className="bg-gradient-to-br from-primary-light to-primary-lighter p-8 rounded-2xl shadow-xl text-white">
              <h2 className="text-3xl font-extrabold mb-6 drop-shadow-md">Welcome Back, Survey Enthusiast!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Wallet Balance */}
                <div className="bg-card-background/20 backdrop-blur-sm p-5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold mb-2 text-white drop-shadow-sm">
                    {isLoadingStats ? "..." : `${dashboardStats?.points_balance || 0} pts`}
                  </div>
                  <h3 className="font-semibold text-white/90">Wallet Balance</h3>
                </div>

                {/* Completed Surveys */}
                <div className="bg-card-background/20 backdrop-blur-sm p-5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold mb-2 text-white drop-shadow-sm">
                    {isLoadingStats ? "..." : dashboardStats?.completed_surveys || 0}
                  </div>
                  <h3 className="font-semibold text-white/90">Surveys Completed</h3>
                </div>

                {/* Pending Redemptions */}
                <div className="bg-card-background/20 backdrop-blur-sm p-5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold mb-2 text-white drop-shadow-sm">
                    {isLoadingStats ? "..." : dashboardStats?.pending_redemptions || 0}
                  </div>
                  <h3 className="font-semibold text-white/90">Pending Redemptions</h3>
                </div>

                {/* Total Earned */}
                <div className="bg-card-background/20 backdrop-blur-sm p-5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold mb-2 text-white drop-shadow-sm">
                    {isLoadingStats ? "..." : `${dashboardStats?.total_earned || 0} pts`}
                  </div>
                  <h3 className="font-semibold text-white/90">Total Earned</h3>
                </div>
              </div>
            </section>

            {/* Survey Section */}
            <section className="bg-card-background p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-primary">🎉 Available Surveys</h3>
              <AvailableSurveysSection onReturnToDashboard={handleReturnToDashboard} />
            </section>

            {/* Activity Feed */}
            <section className="bg-card-background p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-primary">🕒 Recent Activity</h3>
              {isLoadingActivity ? (
                <p className="text-text-secondary text-lg text-center py-8">Loading your recent activities...</p>
              ) : activityFeed.length === 0 ? (
                <p className="text-text-secondary text-lg text-center py-8">No recent activity to display.</p>
              ) : (
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
              )}
            </section>
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
          <section className="bg-card-background p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-primary">🎉 Available Surveys</h3>
            <AvailableSurveysSection onReturnToDashboard={handleReturnToDashboard} />
          </section>
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
        <Button
          id="menuToggle"
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
        >
          <span className="sr-only">Toggle Menu</span>
          <Menu className="lucide lucide-menu h-6 w-6" />
        </Button>
      </header>

      {/* Side Menu */}
      <nav
        id="sideMenu"
        ref={menuRef}
        className={`absolute top-16 right-4 w-64 bg-card-background shadow-xl rounded-lg z-50 transform transition-all duration-300 ease-in-out origin-top-right ${
          isMenuOpen ? "scale-100 opacity-100 data-[state=open]" : "scale-95 opacity-0 hidden"
        }`}
        data-state={isMenuOpen ? "open" : "closed"}
      >
        <ul className="divide-y divide-border-light">
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("profile")}
          >
            <User className="lucide lucide-user h-5 w-5" />
            <span>View Profile</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("history")}
          >
            <History className="lucide lucide-history h-5 w-5" />
            <span>Transfer History</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("redeem")}
          >
            <Wallet className="lucide lucide-wallet h-5 w-5" />
            <span>Redeem Points</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("redemptionHistory")}
          >
            <ReceiptText className="lucide lucide-receipt-text h-5 w-5" />
            <span>Redemption History</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("transfer")}
          >
            <ArrowRightLeft className="lucide lucide-arrow-right-left h-5 w-5" />
            <span>Transfer Points</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("password")}
          >
            <KeyRound className="lucide lucide-key-round h-5 w-5" />
            <span>Change Password</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("pin")}
          >
            <Lock className="lucide lucide-lock h-5 w-5" />
            <span>Change PIN</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-accent-light cursor-pointer flex items-center gap-3 text-lg font-medium text-text-secondary transition-colors duration-150"
            onClick={() => handleMenuAction("surveys")}
          >
            <ClipboardList className="lucide lucide-clipboard-list h-5 w-5" />
            <span>Available Surveys</span>
          </li>
          <li
            className="menu-item p-4 hover:bg-red-100 cursor-pointer flex items-center gap-3 text-lg font-medium text-red-600 transition-colors duration-150"
            onClick={handleLogout}
          >
            <LogOut className="lucide lucide-log-out h-5 w-5" />
            <span>Logout</span>
          </li>
        </ul>
      </nav>

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
