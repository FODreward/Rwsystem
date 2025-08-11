"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink, FileText, Gift, Clock, Star } from "lucide-react"
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
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-6xl mx-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Available Surveys</h2>
            </div>
            {showReturnButton && (
              <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
                Return to Dashboard
              </Button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 text-lg">Loading exciting surveys for you...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-6xl mx-auto">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Surveys</h2>
              <p className="text-gray-500 text-sm">Earn points by completing surveys</p>
            </div>
          </div>
          {showReturnButton && (
            <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
              Return to Dashboard
            </Button>
          )}
        </div>

        {surveys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Surveys Available</h3>
            <p className="text-gray-500 max-w-md">
              We're working on bringing you new exciting surveys. Check back soon for opportunities to earn more points!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Surveys</p>
                    <p className="text-2xl font-bold text-gray-900">{surveys.length}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Gift className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Potential Points</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {surveys.reduce((total, survey) => total + survey.points_reward, 0)} pts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className="flex flex-col h-full">
                    {/* Survey Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
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
                      <Link
                        href={survey.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 group-hover:shadow-lg"
                      >
                        Start Survey
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
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
