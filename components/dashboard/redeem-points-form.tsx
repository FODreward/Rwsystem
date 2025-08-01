"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiCall } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface RedemptionRates {
  bitcoin_rate: number
  gift_card_rate: number
}

export default function RedeemPointsForm({ onRedeemSuccess }: { onRedeemSuccess: () => void }) {
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
        description: "Please enter a destination (wallet address or email).",
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
      await apiCall("/redemption/request", "POST", payload, true)
      toast({
        title: "Redemption Submitted",
        description: "Redemption request submitted successfully!",
      })
      setAmount("")
      setDestination("")
      onRedeemSuccess() // Callback to refresh dashboard stats
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

  const btcPtsPerDollar = rates ? (1 / rates.bitcoin_rate).toFixed(0) : "N/A"
  const giftPtsPerDollar = rates ? (1 / rates.gift_card_rate).toFixed(0) : "N/A"

  return (
    <div className="bg-card-background p-8 rounded-2xl shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-primary">💰 Redeem Points</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="redeemType">Redemption Type</Label>
          <Select value={redeemType} onValueChange={setRedeemType} disabled={isLoading}>
            <SelectTrigger id="redeemType" className="w-full">
              <SelectValue placeholder="Select redemption type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bitcoin">Bitcoin ({btcPtsPerDollar} pts/$)</SelectItem>
              <SelectItem value="gift_card">Gift Card ({giftPtsPerDollar} pts/$)</SelectItem>
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
        <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Redemption"}
        </Button>
      </form>
    </div>
  )
}
