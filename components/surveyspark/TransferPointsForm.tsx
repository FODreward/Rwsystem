"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Send, ArrowRight, CheckCircle, AlertCircle, Info } from "lucide-react"

export default function TransferPointsForm({
  onTransferSuccess,
  onReturnToDashboard,
}: {
  onTransferSuccess: () => void
  onReturnToDashboard: () => void
}) {
  const [receiverEmail, setReceiverEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const isValidEmail = receiverEmail.includes("@") && receiverEmail.includes(".")
  const isValidAmount = amount && !isNaN(Number.parseInt(amount)) && Number.parseInt(amount) > 0
  const isFormValid = isValidEmail && isValidAmount

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    const transferAmount = Number.parseInt(amount)

    if (!receiverEmail.trim() || isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid email and amount greater than zero.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await apiCall("/points/transfer", "POST", { to_email: receiverEmail, amount: transferAmount }, true)
      toast({
        title: "Transfer Successful",
        description: "Points transferred successfully!",
      })
      setReceiverEmail("")
      setAmount("")
      onTransferSuccess()
    } catch (error: any) {
      toast({
        title: "Transfer Failed",
        description: error.message || "Failed to transfer points.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-lg mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Transfer Points</h3>
              <p className="text-blue-100 text-sm">Send points to other users</p>
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

      <div className="p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Transfer Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Transfers are instant and cannot be reversed</li>
                <li>• Recipient must have a registered account</li>
                <li>• Minimum transfer amount is 1 point</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="receiverEmail" className="text-sm font-semibold text-gray-700 mb-2 block">
              Recipient Email Address
            </Label>
            <div className="relative">
              <Input
                id="receiverEmail"
                name="receiver_email"
                type="email"
                placeholder="Enter recipient's email address"
                required
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                disabled={isLoading}
                className={`pl-4 pr-10 py-3 text-base border-2 transition-all duration-200 ${
                  receiverEmail && isValidEmail
                    ? "border-green-300 bg-green-50"
                    : receiverEmail && !isValidEmail
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                }`}
              />
              {receiverEmail && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isValidEmail ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {receiverEmail && !isValidEmail && (
              <p className="text-sm text-red-600 mt-1">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <Label htmlFor="transferAmount" className="text-sm font-semibold text-gray-700 mb-2 block">
              Points to Transfer
            </Label>
            <div className="relative">
              <Input
                id="transferAmount"
                name="amount"
                type="number"
                placeholder="Enter amount to transfer"
                required
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                className={`pl-4 pr-16 py-3 text-base border-2 transition-all duration-200 ${
                  amount && isValidAmount
                    ? "border-green-300 bg-green-50"
                    : amount && !isValidAmount
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <span className="text-sm text-gray-500 font-medium">pts</span>
                {amount &&
                  (isValidAmount ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ))}
              </div>
            </div>
            {amount && !isValidAmount && <p className="text-sm text-red-600 mt-1">Amount must be a positive number</p>}
          </div>

          {isFormValid && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ArrowRight className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Transfer Preview</p>
                    <p className="text-xs text-gray-500">Ready to send</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-green-600">{amount} pts</p>
                  <p className="text-xs text-gray-500">to {receiverEmail}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className={`w-full py-3 text-base font-semibold transition-all duration-200 ${
              isFormValid && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Sending Points...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Points</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
