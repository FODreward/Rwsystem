"use client"

import { useEffect, useState } from "react"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Redemption {
  id: string
  type: string
  points_amount: number
  equivalent_value: number
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function RedemptionHistorySection() {
  const [history, setHistory] = useState<Redemption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true)
      try {
        const data = await apiCall<Redemption[]>("/redemption/history", "GET", null, true)
        setHistory(Array.isArray(data) ? data : [])
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load redemption history.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadHistory()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-text-secondary text-lg">
        Loading redemption history...
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="bg-card-background p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-primary">🧾 Redemption History</h3>
        <p className="text-text-secondary text-lg text-center py-8">No redemption history found.</p>
      </div>
    )
  }

  return (
    <div className="bg-card-background p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-primary">🧾 Redemption History</h3>
      <ul className="space-y-4">
        {history.map((item) => {
          let statusClass = ""
          let statusEmoji = ""
          if (item.status === "approved") {
            statusClass = "bg-green-100 text-green-800"
            statusEmoji = "✅"
          } else if (item.status === "pending") {
            statusClass = "bg-yellow-100 text-yellow-800"
            statusEmoji = "⏳"
          } else {
            statusClass = "bg-red-100 text-red-800"
            statusEmoji = "❌"
          }

          return (
            <li key={item.id} className="bg-background p-5 rounded-xl shadow-sm border border-border-light">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold capitalize text-xl text-text-primary flex items-center gap-2">
                  {statusEmoji} {item.type.replace("_", " ")}
                </h4>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusClass}`}>{item.status}</span>
              </div>
              <p className="text-text-secondary text-base">
                <strong>Points:</strong> {item.points_amount} pts
              </p>
              <p className="text-text-secondary text-base">
                <strong>Value:</strong> ${Number(item.equivalent_value || 0).toFixed(2)}
              </p>
              <p className="text-text-secondary text-sm mt-2">
                <strong>Submitted:</strong> {new Date(item.created_at).toLocaleString()}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
