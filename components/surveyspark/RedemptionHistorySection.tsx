"use client"

import { useEffect, useState, useCallback } from "react"
import { Calendar, Filter, Gift, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDateForInput, getPastDate } from "@/lib/utils"

interface Redemption {
  id: string
  type: string
  points_amount: number
  equivalent_value: string | number
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function RedemptionHistorySection({ onReturnToDashboard }: { onReturnToDashboard: () => void }) {
  const [history, setHistory] = useState<Redemption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const defaultEndDate = new Date()
  const defaultStartDate = getPastDate(30)

  const [startDate, setStartDate] = useState(formatDateForInput(defaultStartDate))
  const [endDate, setEndDate] = useState(formatDateForInput(defaultEndDate))
  const [limit, setLimit] = useState("20")

  const loadHistory = useCallback(async () => {
    setIsLoading(true)

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) {
      toast({
        title: "Invalid Date Range",
        description: "Start date cannot be after end date.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 30) {
      toast({
        title: "Date Range Exceeded",
        description: "Date range cannot exceed 30 days.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const data = await apiCall<Redemption[]>("/redemption/history", "GET", null, true, {
        start_date: startDate,
        end_date: endDate,
        limit: limit,
      })
      setHistory(
        Array.isArray(data)
          ? data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          : [],
      )
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load redemption history.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [startDate, endDate, limit, toast])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const totalRedeemed = history
    .filter((item) => item.status === "approved")
    .reduce((sum, item) => {
      const points = typeof item.points_amount === "number" ? item.points_amount : Number(item.points_amount) || 0
      return sum + points
    }, 0)

  const totalValue = history
    .filter((item) => item.status === "approved")
    .reduce((sum, item) => {
      const value =
        typeof item.equivalent_value === "number"
          ? item.equivalent_value
          : Number.parseFloat(String(item.equivalent_value)) || 0
      return sum + value
    }, 0)

  const approvedCount = history.filter((item) => item.status === "approved").length
  const pendingCount = history.filter((item) => item.status === "pending").length
  const rejectedCount = history.filter((item) => item.status === "rejected").length

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Redemption History</h3>
                <p className="text-purple-100">Track your point redemptions</p>
              </div>
            </div>
            <Button
              onClick={onReturnToDashboard}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Filter Options</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Start Date</span>
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>End Date</span>
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="limit">Items Per Page</Label>
                <Select value={limit} onValueChange={setLimit}>
                  <SelectTrigger id="limit" className="mt-1">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 items</SelectItem>
                    <SelectItem value="20">20 items</SelectItem>
                    <SelectItem value="50">50 items</SelectItem>
                    <SelectItem value="100">100 items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-lg">Loading redemption history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Gift className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No redemption history found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filter criteria</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Gift className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Total Approved Points</span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Redeemed
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {isNaN(totalRedeemed) ? "0" : totalRedeemed.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">points successfully redeemed</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Approved</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      Success
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{approvedCount}</p>
                    <p className="text-gray-500 text-sm">redemptions</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Pending</span>
                    </div>
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                      Processing
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
                    <p className="text-gray-500 text-sm">awaiting approval</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 border-2 border-dashed border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                        <span className="text-pink-600 font-bold text-sm">$</span>
                      </div>
                      <span className="text-gray-600 font-medium">Total Approved Value</span>
                    </div>
                    <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full font-medium">
                      USD Value
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      ${isNaN(totalValue) ? "0.00" : totalValue.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm">total approved value</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Recent Redemptions (Most Recent First)</h4>
                </div>
                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3">
                  {history.map((item) => {
                    let statusConfig = {
                      icon: CheckCircle,
                      bgClass: "bg-white border-gray-100",
                      badgeClass: "bg-green-100 text-green-800",
                      iconBg: "bg-green-100",
                      iconColor: "text-green-600",
                    }

                    if (item.status === "pending") {
                      statusConfig = {
                        icon: AlertCircle,
                        bgClass: "bg-white border-gray-100",
                        badgeClass: "bg-orange-100 text-orange-800",
                        iconBg: "bg-orange-100",
                        iconColor: "text-orange-600",
                      }
                    } else if (item.status === "rejected") {
                      statusConfig = {
                        icon: XCircle,
                        bgClass: "bg-white border-gray-100",
                        badgeClass: "bg-red-100 text-red-800",
                        iconBg: "bg-red-100",
                        iconColor: "text-red-600",
                      }
                    }

                    const StatusIcon = statusConfig.icon

                    return (
                      <div
                        key={item.id}
                        className={`${statusConfig.bgClass} p-4 rounded-xl border transition-all hover:shadow-md`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 ${statusConfig.iconBg} rounded-xl flex items-center justify-center`}
                            >
                              <StatusIcon className={`h-5 w-5 ${statusConfig.iconColor}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 capitalize text-lg">
                                {item.type.replace("_", " ")}
                              </h4>
                              <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleString()}</p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusConfig.badgeClass}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 ml-14">
                          <div>
                            <p className="text-sm text-gray-500">Points Used</p>
                            <p className="font-semibold text-gray-900">{item.points_amount} pts</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Equivalent Value</p>
                            <p className="font-semibold text-gray-900">
                              ${(() => {
                                const value =
                                  typeof item.equivalent_value === "number"
                                    ? item.equivalent_value
                                    : Number.parseFloat(String(item.equivalent_value)) || 0
                                return value.toFixed(2)
                              })()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
