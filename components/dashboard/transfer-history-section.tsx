"use client"

import { useEffect, useState } from "react"
import { apiCall } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"

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

export default function TransferHistorySection() {
  const [history, setHistory] = useState<TransferHistoryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true)
      try {
        const data = await apiCall<TransferHistoryData>("/points/history", "GET", null, true)
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
    }
    loadHistory()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-text-secondary text-lg">
        Loading transfer history...
      </div>
    )
  }

  if (!history) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-500 text-lg">
        Failed to load transfer history.
      </div>
    )
  }

  return (
    <div className="bg-card-background p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-primary">📜 Transfer History</h3>
      {history.transfers.length === 0 ? (
        <p className="text-text-secondary text-lg text-center py-8">No transfer history found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {history.transfers.map((item) => {
              const isSender = currentUser && item.from_user.email === currentUser.email
              const direction = isSender ? "to" : "from"
              const otherParty = isSender ? item.to_user : item.from_user
              const amountClass = isSender ? "text-red-600" : "text-green-600"

              return (
                <li key={item.id} className="bg-background p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium text-text-primary">
                      <strong className={amountClass}>{item.amount} pts</strong> {direction}{" "}
                      <strong>{otherParty.name}</strong>
                    </p>
                    <span className="text-sm text-text-secondary">{new Date(item.created_at).toLocaleString()}</span>
                  </div>
                  <span className="text-sm text-text-secondary">({otherParty.email})</span>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 text-lg font-semibold text-text-primary border-t border-border-light pt-4">
            <p>
              <strong>Total Sent:</strong> <span className="text-red-600">{history.total_sent} pts</span>
            </p>
            <p>
              <strong>Total Received:</strong> <span className="text-green-600">{history.total_received} pts</span>
            </p>
          </div>
        </>
      )}
    </div>
  )
}
