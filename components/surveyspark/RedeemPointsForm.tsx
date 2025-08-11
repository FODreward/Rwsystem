"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Bitcoin, Gift, DollarSign, AlertCircle, CheckCircle2, Wallet, Mail } from "lucide-react"

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
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
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

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    const pointsAmount = Number.parseFloat(amount)
    if (!amount) {
      errors.amount = "Amount is required"
    } else if (isNaN(pointsAmount) || pointsAmount <= 0) {
      errors.amount = "Amount must be greater than zero"
    } else if (pointsAmount < 100) {
      errors.amount = "Minimum redemption is 100 points"
    }

    if (!destination.trim()) {
      errors.destination = redeemType === "bitcoin" ? "Wallet address is required" : "Email address is required"
    } else if (redeemType === "gift_card" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination)) {
      errors.destination = "Please enter a valid email address"
    } else if (redeemType === "bitcoin" && destination.length < 26) {
      errors.destination = "Please enter a valid Bitcoin wallet address"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    if (amount || destination) {
      validateForm()
    }
  }, [amount, destination, redeemType])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    const pointsAmount = Number.parseFloat(amount)
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
      setValidationErrors({})
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
    return `${points.toFixed(0)} pts = $${rates.base_dollar.toFixed(2)}`
  }

  const calculateValue = (points: string): string => {
    if (!rates || !points || isNaN(Number.parseFloat(points))) return ""
    const pointsAmount = Number.parseFloat(points)
    const rate = redeemType === "bitcoin" ? rates.bitcoin_rate : rates.gift_card_rate
    const dollarValue = (pointsAmount * rate) / rates.base_dollar
    return `≈ $${dollarValue.toFixed(2)}`
  }

  const bitcoinRateLabel = rates ? formatRate(rates.bitcoin_rate) : "Loading..."
  const giftCardRateLabel = rates ? formatRate(rates.gift_card_rate) : "Loading..."

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Redeem Points</h3>
              <p className="text-green-100">Convert your points to real rewards</p>
            </div>
          </div>
          <Button
            onClick={onReturnToDashboard}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>

      <div className="p-8">
        {rates && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Bitcoin className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900">Bitcoin Rate</h4>
                  <p className="text-sm text-orange-700">{bitcoinRateLabel}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Gift className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900">Gift Card Rate</h4>
                  <p className="text-sm text-purple-700">{giftCardRateLabel}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="redeemType" className="text-base font-semibold text-gray-900">
              Redemption Type
            </Label>
            <Select value={redeemType} onValueChange={setRedeemType} disabled={isLoading}>
              <SelectTrigger id="redeemType" className="w-full mt-2 h-12">
                <SelectValue placeholder="Select redemption type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="h-4 w-4 text-orange-500" />
                    <span>Bitcoin ({bitcoinRateLabel})</span>
                  </div>
                </SelectItem>
                <SelectItem value="gift_card">
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4 text-purple-500" />
                    <span>Gift Card ({giftCardRateLabel})</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="redeemAmount" className="text-base font-semibold text-gray-900">
              Points to Redeem
            </Label>
            <div className="mt-2 relative">
              <Input
                id="redeemAmount"
                name="amount"
                type="number"
                placeholder="e.g., 1000"
                required
                min={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                className={`h-12 pr-20 ${validationErrors.amount ? "border-red-500 focus:border-red-500" : amount && !validationErrors.amount ? "border-green-500 focus:border-green-500" : ""}`}
              />
              {amount && !validationErrors.amount && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              )}
              {validationErrors.amount && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {validationErrors.amount && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {validationErrors.amount}
              </p>
            )}
            {amount && !validationErrors.amount && (
              <p className="text-green-600 text-sm mt-1 font-medium">{calculateValue(amount)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="redeemDestination" className="text-base font-semibold text-gray-900">
              {redeemType === "bitcoin" ? "Bitcoin Wallet Address" : "Email Address"}
            </Label>
            <div className="mt-2 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {redeemType === "bitcoin" ? (
                  <Wallet className="h-5 w-5 text-gray-400" />
                ) : (
                  <Mail className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <Input
                id="redeemDestination"
                name="destination"
                placeholder={
                  redeemType === "bitcoin" ? "Enter your Bitcoin wallet address" : "Enter your email address"
                }
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                disabled={isLoading}
                className={`h-12 pl-10 pr-10 ${validationErrors.destination ? "border-red-500 focus:border-red-500" : destination && !validationErrors.destination ? "border-green-500 focus:border-green-500" : ""}`}
              />
              {destination && !validationErrors.destination && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              )}
              {validationErrors.destination && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {validationErrors.destination && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {validationErrors.destination}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            disabled={isLoading || Object.keys(validationErrors).length > 0}
          >
            {isLoading ? "Processing Redemption..." : "Submit Redemption Request"}
          </Button>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Minimum redemption amount is 100 points</li>
                <li>• Bitcoin redemptions are processed within 24-48 hours</li>
                <li>• Gift card redemptions are processed within 1-3 business days</li>
                <li>• All redemptions are final and cannot be reversed</li>
                <li>• Processing fees may apply based on redemption type</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
