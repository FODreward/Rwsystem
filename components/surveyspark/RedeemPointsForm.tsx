"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface RedemptionRates {
  bitcoin_rate: number
  gift_card_rate: number
  base_dollar: number
}

export default function RedeemPointsForm({
  onRedeemSuccess,
  onReturnToDashboard,
}: {
  onRedeemSuccess: () => void
  onReturnToDashboard: () => void
}) {
  const [redeemType, setRedeemType] = useState("bitcoin")
  const [amount, setAmount] = useState("")
  const [destination, setDestination] = useState("")
  const [rates, setRates] = useState<RedemptionRates | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await apiCall<RedemptionRates>("/redemption/rates", "GET", null, true)
        setRates(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load redemption rates.",
          variant: "destructive",
        })
      }
    }
    loadRates()
  }, [toast])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    const pointsAmount = Number.parseFloat(amount)
    if (isNaN(pointsAmount) || pointsAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!destination.trim()) {
      toast({
        title: "Missing Destination",
        description: "Please enter a destination (wallet or email).",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const payload: any = {
      type: redeemType,
      points_amount: pointsAmount,
    }

    if (redeemType === "bitcoin") {
      payload.wallet_address = destination
    } else if (redeemType === "gift_card") {
      payload.email_address = destination
    }

    try {
      await apiCall("/api/redemption/request", "POST", payload, true)
      toast({
        title: "Redemption Submitted",
        description: "Redemption request submitted successfully!",
      })
      setAmount("")
      setDestination("")
      onRedeemSuccess()
    } catch (error: any) {
      toast({
        title: "Redemption Failed",
        description: error.message || "Failed to submit redemption request.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatRate = (rate: number): string => {
    if (!rates) return "Loading..."

    const points = rates.base_dollar / rate
    return `${points.toFixed(0)} pts / $${rates.base_dollar.toFixed(2)}`
  }

  const bitcoinRateLabel = rates ? formatRate(rates.bitcoin_rate) : "Loading..."
  const giftCardRateLabel = rates ? formatRate(rates.gift_card_rate) : "Loading..."

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">💰 Redeem Points</h3>
        <Button onClick={onReturnToDashboard} variant="outline">
          Return to Dashboard
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="redeemType">Redemption Type</Label>
          <Select value={redeemType} onValueChange={setRedeemType} disabled={isLoading}>
            <SelectTrigger id="redeemType" className="w-full">
              <SelectValue placeholder="Select redemption type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bitcoin">Bitcoin ({bitcoinRateLabel})</SelectItem>
              <SelectItem value="gift_card">Gift Card ({giftCardRateLabel})</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="redeemAmount">Points to Redeem</Label>
          <Input
            id="redeemAmount"
            name="amount"
            type="number"
            placeholder="e.g., 1000"
            required
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="redeemDestination">Destination</Label>
          <Input
            id="redeemDestination"
            name="destination"
            placeholder={redeemType === "bitcoin" ? "Wallet Address" : "Email for Gift Card"}
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Redemption"}
        </Button>
      </form>
    </div>
  )
}
