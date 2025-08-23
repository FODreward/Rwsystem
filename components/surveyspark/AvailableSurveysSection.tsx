"use client"

import { useEffect, useState } from "react"
import { ExternalLink, FileText, Gift, Clock, Star, ArrowLeft, Target, Zap } from "lucide-react"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface Survey {
  id: string
  title: string
  description?: string
  points_reward: number
  redirect_url: string
}

interface AdGemOffer {
  id: string
  title: string
  description?: string
  points_reward: number
  redirect_url: string
  type?: string
}

export default function AvailableSurveysSection({
  onReturnToDashboard,
  showReturnButton = true,
}: {
  onReturnToDashboard: () => void
  showReturnButton?: boolean
}) {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [adgemOffers, setAdgemOffers] = useState<AdGemOffer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadOffersAndSurveys = async () => {
      setIsLoading(true)
      try {
        const [surveysData, adgemData] = await Promise.all([
          apiCall<Survey[]>("/surveys/available", "GET", null, true),
          apiCall<AdGemOffer[]>("/surveys/adgem/available", "GET", null, true),
        ])
        setSurveys(surveysData)
        setAdgemOffers(adgemData)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load offers and surveys.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadOffersAndSurveys()
  }, [toast])

  const totalOpportunities = surveys.length + adgemOffers.length
  const totalPotentialEarnings =
    surveys.reduce((total, survey) => total + survey.points_reward, 0) +
    adgemOffers.reduce((total, offer) => total + offer.points_reward, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Gift className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Available Offers & Tasks</h2>
              </div>
              {showReturnButton && (
                <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Dashboard
                </Button>
              )}
            </div>
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Gift className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-500 text-lg">Loading exciting opportunities for you...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Available Offers & Tasks</h1>
            <p className="text-gray-600">Complete offers, tasks, and surveys to earn points and rewards</p>
          </div>
          {showReturnButton && (
            <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
        </div>

        {totalOpportunities === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Opportunities Available</h3>
              <p className="text-gray-500 max-w-md">
                We're working on bringing you new exciting offers and tasks. Check back soon for opportunities to earn
                more points!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Premium Offers</span>
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                    Priority
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{adgemOffers.length}</p>
                  <p className="text-gray-500 text-sm">offers available</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Surveys</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    Available
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{surveys.length}</p>
                  <p className="text-gray-500 text-sm">surveys waiting</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Total Opportunities</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Ready</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{totalOpportunities}</p>
                  <p className="text-gray-500 text-sm">activities available</p>
                </div>
              </div>
            </div>

            {adgemOffers.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Premium Offers</h2>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                    High Priority
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adgemOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="bg-white rounded-2xl p-6 border-2 border-purple-200 hover:shadow-lg hover:border-purple-300 transition-all duration-200 group"
                    >
                      <div className="flex flex-col h-full">
                        {/* Offer Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <Target className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                            <Gift className="h-4 w-4" />
                            <span>{offer.points_reward} pts</span>
                          </div>
                        </div>

                        {/* Offer Content */}
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{offer.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {offer.description || "Complete this premium offer to earn points and exclusive rewards."}
                          </p>
                        </div>

                        {/* Offer Footer */}
                        <div className="pt-4 border-t border-gray-100">
                          <a
                            href={offer.redirect_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 group-hover:shadow-lg"
                          >
                            Start Offer
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {surveys.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Available Surveys</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {surveys.map((survey) => (
                    <div
                      key={survey.id}
                      className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
                    >
                      <div className="flex flex-col h-full">
                        {/* Survey Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            <Gift className="h-4 w-4" />
                            <span>{survey.points_reward} pts</span>
                          </div>
                        </div>

                        {/* Survey Content */}
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{survey.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {survey.description || "Complete this survey to earn points and help improve our services."}
                          </p>
                        </div>

                        {/* Survey Footer */}
                        <div className="pt-4 border-t border-gray-100">
                          <a
                            href={survey.redirect_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 group-hover:shadow-lg"
                          >
                            Start Survey
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
