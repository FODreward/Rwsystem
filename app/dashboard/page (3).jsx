'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGift, faMousePointer, faWallet, faHourglassHalf, faCheckCircle, faExchangeAlt, faTrophy, faChartLine, faTimes, faTachometerAlt, faPoll, faHistory, faUserCircle, faHeadset, faSignOutAlt, faBullseye, faUser, faKey, faLock, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiCall } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// Import dashboard sections
import ProfileSection from "@/components/dashboard/profile-section";
import TransferHistorySection from "@/components/dashboard/transfer-history-section";
import RedeemPointsForm from "@/components/dashboard/redeem-points-form";
import RedemptionHistorySection from "@/components/dashboard/redemption-history-section";
import TransferPointsForm from "@/components/dashboard/transfer-points-form";
import ChangePasswordForm from "@/components/dashboard/change-password-form";
import ChangePinForm from "@/components/dashboard/change-pin-form";
import AvailableSurveysSection from "@/components/dashboard/available-surveys-section";

interface DashboardStats {
  points_balance: number;
  completed_surveys: number;
  pending_redemptions: number;
  total_earned: number;
  pending_points_balance: number;
  is_flagged?: boolean;
}

interface ActivityItem {
  type: string;
  message: string;
  timestamp: string;
}

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || "dashboardHome";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { clearAuthData, isLoading: isAuthLoading, currentUser } = useAuth();
  const { toast } = useToast();

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      sessionStorage.setItem("prePinVerifyPath", router.asPath || "/dashboard");
      toast({
        title: "Session Timeout",
        description: "You've been inactive. Please verify your PIN to continue.",
        variant: "destructive",
      });
      router.push("/pin-verify-login");
    }, INACTIVITY_TIMEOUT_MS);
  }, [router, toast]);

  useEffect(() => {
    if (!isAuthLoading && sessionStorage.getItem("accessToken")) {
      resetInactivityTimer();

      const handleActivity = () => resetInactivityTimer();

      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("click", handleActivity);
      window.addEventListener("scroll", handleActivity);

      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("click", handleActivity);
        window.removeEventListener("scroll", handleActivity);
      };
    }
  }, [isAuthLoading, resetInactivityTimer]);

  useEffect(() => {
    if (!isAuthLoading && !sessionStorage.getItem("accessToken")) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [isAuthLoading, router, toast]);

  const loadDashboardStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const data = await apiCall<DashboardStats>("/dashboard/stats", "GET", null, true);
      if (data?.is_flagged) {
        toast({
          title: "Account Restricted",
          description: "Your account is temporarily restricted due to suspicious activity. Please contact support.",
          variant: "destructive",
        });
      }
      setDashboardStats(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load dashboard stats.",
        variant: "destructive",
      });
      setDashboardStats(null);
    } finally {
      setIsLoadingStats(false);
    }
  }, [toast]);

  const loadActivity = useCallback(async () => {
    setIsLoadingActivity(true);
    try {
      const data = await apiCall<ActivityItem[]>("/dashboard/activity", "GET", null, true);
      setActivityFeed(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load activity feed.",
        variant: "destructive",
      });
      setActivityFeed([]);
    } finally {
      setIsLoadingActivity(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!isAuthLoading && sessionStorage.getItem("accessToken")) {
      loadDashboardStats();
      loadActivity();
    }
  }, [isAuthLoading, loadDashboardStats, loadActivity]);

  const handleMenuAction = (section: string) => {
    setActiveSection(section);
    router.replace(`/dashboard?section=${section}`, undefined, { shallow: true });
    setIsSidebarOpen(false);
  };

  const handleReturnToDashboard = useCallback(() => {
    setActiveSection("dashboardHome");
    router.replace("/dashboard?section=dashboardHome", undefined, { shallow: true });
  }, [router]);

  const handleLogout = () => {
    clearAuthData();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboardHome":
        return (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {currentUser?.name || 'Friday'}! 👋
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Here's your earning summary and latest opportunities
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last login</p>
                  <p className="font-semibold text-gray-900">Today, 1:15 AM</p>
                </div>
              </div>
            </div>

            <Card
              className="survey-banner card-hover rounded-2xl p-8 mb-8 text-white cursor-pointer relative z-10"
              onClick={() => handleMenuAction('surveys')}
            >
              <CardContent className="relative z-10 p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faGift} className="text-3xl" />
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
                  <FontAwesomeIcon icon={faMousePointer} />
                  <span className="text-white text-opacity-90">Click to explore premium surveys</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card className="metric-card card-hover rounded-2xl p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faWallet} className="text-white text-lg" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Wallet Balance</h4>
                  <p className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : dashboardStats?.points_balance || 490.00}</p>
                  <p className="text-sm text-gray-500">points available</p>
                </CardContent>
              </Card>

              <Card className="metric-card card-hover rounded-2xl p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faHourglassHalf} className="text-white text-lg" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Pending</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Pending Points</h4>
                  <p className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : dashboardStats?.pending_points_balance || 300.0}</p>
                  <p className="text-sm text-gray-500">processing</p>
                </CardContent>
              </Card>

              <Card className="metric-card card-hover rounded-2xl p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-white text-lg" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">+1 Today</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Completed</h4>
                  <p className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : dashboardStats?.completed_surveys || 1}</p>
                  <p className="text-sm text-gray-500">this month</p>
                </CardContent>
              </Card>

              <Card className="metric-card card-hover rounded-2xl p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faExchangeAlt} className="text-white text-lg" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">None</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Redemptions</h4>
                  <p className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : dashboardStats?.pending_redemptions || 0}</p>
                  <p className="text-sm text-gray-500">pending</p>
                </CardContent>
              </Card>

              <Card className="metric-card card-hover rounded-2xl p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faTrophy} className="text-white text-lg" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium">Lifetime</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Total Earned</h4>
                  <p className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : dashboardStats?.total_earned || 50.00}</p>
                  <p className="text-sm text-gray-500">points</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-effect rounded-2xl p-8 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All</button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="activity-timeline">
                  {isLoadingActivity ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                  ) : activityFeed.length === 0 ? (
                    <p className="text-gray-500 text-center">No activity</p>
                  ) : (
                    activityFeed.map((item, index) => {
                      let icon = faBell;
                      let iconColorClass = "text-yellow-600";

                      if (item.type === "SURVEY_COMPLETED") { icon = faCheckCircle; iconColorClass = "text-green-600"; }
                      else if (item.type === "REDEMPTION_REQUEST") { icon = faWallet; iconColorClass = "text-blue-600"; }
                      else if (item.type === "POINTS_TRANSFER") { icon = faExchangeAlt; iconColorClass = "text-purple-600"; }
                      else if (item.type === "USER_SIGNUP") { icon = faUser; iconColorClass = "text-teal-600"; }
                      else if (item.type === "PASSWORD_CHANGE" || item.type === "PIN_CHANGE") { icon = faLock; iconColorClass = "text-gray-600"; }
                      else if (item.type === "USER_LOGIN") { icon = faKey; iconColorClass = "text-indigo-600"; }

                      return (
                        <div key={index} className="activity-item">
                          <div className="activity-dot"></div>
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={icon} className={`h-5 w-5 ${iconColorClass}`} />
                                <div>
                                  <p className="font-semibold text-gray-900">{item.message}</p>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        );
      case "profile":
        return <ProfileSection onReturnToDashboard={handleReturnToDashboard} />;
      case "history":
        return <TransferHistorySection onReturnToDashboard={handleReturnToDashboard} />;
      case "redeem":
        return <RedeemPointsForm onRedeemSuccess={loadDashboardStats} onReturnToDashboard={handleReturnToDashboard} />;
      case "redemptionHistory":
        return <RedemptionHistorySection onReturnToDashboard={handleReturnToDashboard} />;
      case "transfer":
        return <TransferPointsForm onTransferSuccess={loadDashboardStats} onReturnToDashboard={handleReturnToDashboard} />;
      case "password":
        return <ChangePasswordForm onReturnToDashboard={handleReturnToDashboard} />;
      case "pin":
        return <ChangePinForm onReturnToDashboard={handleReturnToDashboard} />;
      case "surveys":
        return <AvailableSurveysSection onReturnToDashboard={handleReturnToDashboard} showReturnButton={true} />;
      default:
        return null;
    }
  };

  if (isAuthLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <>
      <div
        className={`overlay fixed inset-0 bg-black bg-opacity-50 z-40 ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`sidebar fixed left-0 top-0 h-full w-80 glass-effect z-50 p-6 ${isSidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="text-white text-lg" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">SurveySpark</h2>
              <span className="premium-badge text-xs px-2 py-1 rounded-full font-semibold">PRO</span>
            </div>
          </div>
          <Button onClick={toggleSidebar} className="btn btn-primary p-2 hover:bg-primary-700 rounded-lg">
            <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
          </Button>
        </div>
        <nav className="space-y-2">
          <Button
            onClick={() => handleMenuAction('dashboardHome')}
            className="flex items-center space-x-3 p-3 rounded-xl bg-indigo-50 text-indigo-700 font-medium w-full"
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </Button>
          <Button
            onClick={() => handleMenuAction('surveys')}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700 w-full"
          >
            <FontAwesomeIcon icon={faPoll} />
            <span>Available Surveys</span>
          </Button>
          <Button
            onClick={() => handleMenuAction('transfer')}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700 w-full"
          >
            <FontAwesomeIcon icon={faWallet} />
            <span>Wallet & Rewards</span>
          </Button>
          <Button
            onClick={() => handleMenuAction('history')}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700 w-full"
          >
            <FontAwesomeIcon icon={faHistory} />
            <span>Survey History</span>
          </Button>
          <Button
            onClick={() => handleMenuAction('profile')}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700 w-full"
          >
            <FontAwesomeIcon icon={faUserCircle} />
            <span>Profile Settings</span>
          </Button>
          <Button
            onClick={() => handleMenuAction('support')}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700 w-full"
          >
            <FontAwesomeIcon icon={faHeadset} />
            <span>Support Center</span>
          </Button>
          <Button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-100 text-red-600 w-full"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </Button>
        </nav>
      </div>

      <header className="glass-effect sticky top-0 z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleSidebar}
                className="btn btn-primary p-2 hover:bg-primary-700 rounded-xl"
              >
                <FontAwesomeIcon icon={faBars} className="text-lg" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faBullseye} className="text-white" />
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
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23667eea'/%3E%3Ctext x='16' y='21' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3EF%3C/text%3E%3C/svg%3E"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-900">{currentUser?.name || 'Friday O.'}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="btn btn-primary px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg"
                  >
                    <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl rounded-lg z-50">
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("profile")}
                  >
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("history")}
                  >
                    <FontAwesomeIcon icon={faHistory} className="h-4 w-4" />
                    <span>Transfer History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("redeem")}
                  >
                    <FontAwesomeIcon icon={faWallet} className="h-4 w-4" />
                    <span>Redeem Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("redemptionHistory")}
                  >
                    <FontAwesomeIcon icon={faReceipt} className="h-4 w-4" />
                    <span>Redemption History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("transfer")}
                  >
                    <FontAwesomeIcon icon={faExchangeAlt} className="h-4 w-4" />
                    <span>Transfer Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("password")}
                  >
                    <FontAwesomeIcon icon={faKey} className="h-4 w-4" />
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("pin")}
                  >
                    <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                    <span>Change PIN</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => handleMenuAction("surveys")}
                  >
                    <FontAwesomeIcon icon={faPoll} className="h-4 w-4" />
                    <span>Available Surveys</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    className="p-3 hover:bg-red-100 cursor-pointer flex items-center gap-2 text-base font-medium text-red-600"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faChartLine} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">SurveySpark</h3>
                  <span className="premium-badge text-xs px-2 py-1 rounded-full font-semibold">PRO</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">&copy; 2025 SurveySpark. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <a href="#" className="text-blue-600 hover:underline">Support</a>
                <a href="#" className="text-blue-600 hover:underline">Terms</a>
                <a href="#" className="text-blue-600 hover:underline">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}