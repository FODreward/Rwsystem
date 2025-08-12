"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import {
  Bitcoin,
  Gift,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Mail,
  ArrowLeft,
  Info,
  Loader2,
} from "lucide-react"

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
  const [isLoadingRates, setIsLoadingRates] = useState(true) // Added separate loading state for rates
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()

  useEffect(() => {
    const loadRates = async () => {
      setIsLoadingRates(true) // Set loading state
      try {
        let data: RedemptionRates
        try {
          data = await apiCall<RedemptionRates>("/redemption/rates", "GET", null, true)
        } catch (error) {
          // Try alternative endpoint if first fails
          data = await apiCall<RedemptionRates>("/api/redemption/rates", "GET", null, true)
        }

        if (data && typeof data === "object") {
          // Convert string numbers to actual numbers if needed
          const processedRates: RedemptionRates = {
            bitcoin_rate: Number(data.bitcoin_rate) || 0.001,
            gift_card_rate: Number(data.gift_card_rate) || 0.01,
            base_dollar: Number(data.base_dollar) || 1,
          }
          setRates(processedRates)
        } else {
          setRates({
            bitcoin_rate: 0.001,
            gift_card_rate: 0.01,
            base_dollar: 1,
          })
        }
      } catch (error: any) {
        console.error("Failed to load rates:", error)
        setRates({
          bitcoin_rate: 0.001,
          gift_card_rate: 0.01,
          base_dollar: 1,
        })
        toast({
          title: "Using Default Rates",
          description: "Could not load current rates. Using default values.",
          variant: "default",
        })
      } finally {
        setIsLoadingRates(false) // Clear loading state
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
    } else if (pointsAmount < 500) {
      errors.amount = "Minimum redemption is 500 points"
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
      try {
        await apiCall("/redemption/request", "POST", payload, true)
      } catch (error) {
        await apiCall("/api/redemption/request", "POST", payload, true)
      }

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
    if (isLoadingRates) return "Loading..."
    if (!rates || typeof rate !== "number" || rate <= 0) return "Rate unavailable"

    const points = rates.base_dollar / rate
    return `${Math.round(points)} pts = $${rates.base_dollar.toFixed(2)}`
  }

  const calculateValue = (points: string): string => {
    if (isLoadingRates || !rates || !points || isNaN(Number.parseFloat(points))) return ""

    const pointsAmount = Number.parseFloat(points)
    const rate = redeemType === "bitcoin" ? rates.bitcoin_rate : rates.gift_card_rate

    if (typeof rate !== "number" || rate <= 0) return ""

    const dollarValue = (pointsAmount * rate) / rates.base_dollar
    return `≈ $${dollarValue.toFixed(2)}`
  }

  const bitcoinRateLabel = formatRate(rates?.bitcoin_rate || 0)
  const giftCardRateLabel = formatRate(rates?.gift_card_rate || 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Redeem Points</h1>
            <p className="text-gray-600">Convert your points to real rewards</p>
          </div>
          <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Point Redemption</h2>
                <p className="text-purple-100 text-sm">Turn your points into rewards</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Rate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Bitcoin className="h-5 w-5 text-orange-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Bitcoin Rate</span>
                  </div>
                  {isLoadingRates && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{bitcoinRateLabel}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Gift Card Rate</span>
                  </div>
                  {isLoadingRates && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{giftCardRateLabel}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="redeemType" className="text-base font-bold text-gray-900">
                  Redemption Type
                </Label>
                <Select value={redeemType} onValueChange={setRedeemType} disabled={isLoading || isLoadingRates}>
                  <SelectTrigger id="redeemType" className="w-full mt-2 h-12">
                    <SelectValue placeholder="Select redemption type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">
                      <div className="flex items-center space-x-2">
                        <Bitcoin className="h-4 w-4 text-orange-600" />
                        <span>Bitcoin ({bitcoinRateLabel})</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gift_card">
                      <div className="flex items-center space-x-2">
                        <Gift className="h-4 w-4 text-purple-600" />
                        <span>Gift Card ({giftCardRateLabel})</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="redeemAmount" className="text-base font-bold text-gray-900">
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
                    disabled={isLoading || isLoadingRates}
                    className={`h-12 pr-20 ${validationErrors.amount ? "border-red-500 focus:border-red-500" : amount && !validationErrors.amount ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                  {amount && !validationErrors.amount && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
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
                {amount && !validationErrors.amount && !isLoadingRates && (
                  <p className="text-green-600 text-sm mt-1 font-medium">{calculateValue(amount)}</p>
                )}
              </div>

              <div>
                <Label htmlFor="redeemDestination" className="text-base font-bold text-gray-900">
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
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
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
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                disabled={isLoading || isLoadingRates || Object.keys(validationErrors).length > 0}
              >
                {isLoading
                  ? "Processing Redemption..."
                  : isLoadingRates
                    ? "Loading Rates..."
                    : "Submit Redemption Request"}
              </Button>
            </form>

            {/* Important Information */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mt-0.5">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Important Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
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
      </div>
    </div>
  )
}
