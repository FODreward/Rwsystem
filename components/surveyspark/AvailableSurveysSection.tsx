"use client"

import { useEffect, useState } from "react"
import { ExternalLink, FileText, Gift, Clock, Star, ArrowLeft } from "lucide-react"
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

export default function AvailableSurveysSection({
  onReturnToDashboard,
  showReturnButton = true,
}: {
  onReturnToDashboard: () => void
  showReturnButton?: boolean
}) {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadSurveys = async () => {
      setIsLoading(true)
      try {
        const data = await apiCall<Survey[]>("/surveys/available", "GET", null, true)
        setSurveys(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load surveys.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadSurveys()
  }, [toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Available Surveys</h2>
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
                <FileText className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-500 text-lg">Loading exciting surveys for you...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Available Surveys</h1>
            <p className="text-gray-600">Complete surveys to earn points and rewards</p>
          </div>
          {showReturnButton && (
            <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
        </div>

        {/* Premium Surveys Card */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Gift className="h-6 w-6" />
                <h3 className="text-xl font-bold">Premium Surveys Available!</h3>
              </div>
              <p className="text-purple-100 mb-4">High-value opportunities with bonus rewards</p>
            </div>
            <div className="text-right">
              <p className="text-purple-200 text-sm">Available Surveys</p>
              <p className="text-2xl font-bold">{surveys.length}</p>
              <p className="text-purple-200 text-sm">surveys</p>
            </div>
          </div>
        </div>

        {surveys.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Surveys Available</h3>
              <p className="text-gray-500 max-w-md">
                We're working on bringing you new exciting surveys. Check back soon for opportunities to earn more
                points!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Available Surveys</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Ready</span>
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
                      <Gift className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Total Potential</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    Earnings
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {surveys.reduce((total, survey) => total + survey.points_reward, 0)}
                  </p>
                  <p className="text-gray-500 text-sm">points available</p>
                </div>
              </div>
            </div>

            {/* Surveys Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-200 group"
                >
                  <div className="flex flex-col h-full">
                    {/* Survey Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <FileText className="h-5 w-5 text-purple-600" />
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
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 group-hover:shadow-lg"
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
    </div>
  )
}
