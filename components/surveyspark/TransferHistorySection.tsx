"use client"

import { useEffect, useState, useCallback } from "react"
import { Calendar, Filter, ArrowUpDown, TrendingUp, TrendingDown, Clock } from "lucide-react"
import { apiCall } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDateForInput, getPastDate } from "@/lib/utils"

interface Transfer {
  id: string
  from_user: { email: string; name: string }
  to_user: { email: string; name: string }
  amount: number
  created_at: string
}

interface TransferHistoryData {
  transfers: Transfer[]
  total_sent: number
  total_received: number
}

export default function TransferHistorySection({ onReturnToDashboard }: { onReturnToDashboard: () => void }) {
  const [history, setHistory] = useState<TransferHistoryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()
  const { toast } = useToast()

  const defaultEndDate = new Date()
  const defaultStartDate = getPastDate(30)

  const [startDate, setStartDate] = useState(formatDateForInput(defaultStartDate))
  const [endDate, setEndDate] = useState(formatDateForInput(defaultEndDate))
  const [limit, setLimit] = useState("20") // Set default to 20 as requested

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
      const data = await apiCall<TransferHistoryData>("/points/history", "GET", null, true, {
        start_date: startDate,
        end_date: endDate,
        limit: limit,
      })

      if (data && data.transfers) {
        data.transfers = data.transfers.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
      }

      setHistory(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load transfer history.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [startDate, endDate, limit, toast])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <ArrowUpDown className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Transfer History</h3>
              <p className="text-purple-100">Track your point transfers</p>
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
            <p className="text-lg">Loading transfer history...</p>
          </div>
        ) : !history || history.transfers.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <ArrowUpDown className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No transfer history found</p>
            <p className="text-gray-400 text-sm">Try adjusting your filter criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Total Received</p>
                    <p className="text-3xl font-bold text-gray-900">{history.total_received}</p>
                    <p className="text-gray-500 text-sm">points</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Total Sent</p>
                    <p className="text-3xl font-bold text-gray-900">{history.total_sent}</p>
                    <p className="text-gray-500 text-sm">points</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ArrowUpDown className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Total Transfers</p>
                    <p className="text-3xl font-bold text-gray-900">{history.transfers.length}</p>
                    <p className="text-gray-500 text-sm">transactions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Recent Transfers (Most Recent First)</h4>
              </div>
              <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3">
                {history.transfers.map((item) => {
                  const isSender = currentUser && item.from_user.email === currentUser.email
                  const direction = isSender ? "to" : "from"
                  const otherParty = isSender ? item.to_user : item.from_user
                  const amountClass = isSender ? "text-red-600" : "text-green-600"
                  const bgClass = isSender ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"

                  return (
                    <div
                      key={item.id}
                      className={`bg-white ${bgClass} p-4 rounded-xl border transition-all hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`p-1 rounded-full ${isSender ? "bg-red-100" : "bg-green-100"}`}>
                              {isSender ? (
                                <TrendingUp className="h-4 w-4 text-red-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <p className="font-semibold text-gray-900">
                              <span className={`${amountClass} font-bold`}>{item.amount} pts</span> {direction}{" "}
                              {otherParty.name}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{otherParty.email}</p>
                          <p className="text-xs text-gray-500 ml-6 mt-1">
                            {new Date(item.created_at).toLocaleString()}
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
  )
}
