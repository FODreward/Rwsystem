"use client"

import Link from "next/link"

import { useEffect, useState, useCallback } from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Import Card components
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

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboardHome")
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([])
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [isLoadingActivity, setIsLoadingActivity] = useState(true)

  const { clearAuthData, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

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
    // setIsMenuOpen(false) // Remove this line
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
            {/* Combined Welcome and Wallet Balance Section */}
            <Card className="bg-gradient-to-br from-primary-500 to-primary-600 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
              {/* Optional: Add a subtle background pattern or graphic */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'url("/placeholder.svg?height=200&width=200")' }}
              ></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 drop-shadow-md">
                    Welcome Back, Survey Enthusiast!
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 drop-shadow-sm">
                    Your journey to exciting rewards continues!
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end text-right">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="h-12 w-12 text-white drop-shadow-sm" />
                    <span className="text-5xl md:text-6xl font-bold drop-shadow-lg">
                      {isLoadingStats ? "..." : `${dashboardStats?.points_balance || 0} pts`}
                    </span>
                  </div>
                  <p className="text-lg text-white/90 drop-shadow-sm">Current Wallet Balance</p>
                </div>
              </div>
            </Card>

            {/* Other Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-background p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <ClipboardList className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-3xl font-bold text-primary mb-1">
                  {isLoadingStats ? "..." : dashboardStats?.completed_surveys || 0}
                </CardTitle>
                <CardContent className="p-0 text-sm text-text-secondary">Surveys Completed</CardContent>
              </Card>
              <Card className="bg-background p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <ReceiptText className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-3xl font-bold text-primary mb-1">
                  {isLoadingStats ? "..." : dashboardStats?.pending_redemptions || 0}
                </CardTitle>
                <CardContent className="p-0 text-sm text-text-secondary">Pending Redemptions</CardContent>
              </Card>
              <Card className="bg-background p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <History className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-3xl font-bold text-primary mb-1">
                  {isLoadingStats ? "..." : `${dashboardStats?.total_earned || 0} pts`}
                </CardTitle>
                <CardContent className="p-0 text-sm text-text-secondary">Total Earned</CardContent>
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
            <DropdownMenuSeparator className="bg-border-light" /> {/* Add separator */}
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
            <DropdownMenuSeparator className="bg-border-light" /> {/* Add separator */}
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
