"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
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
        const data = await apiCall<Survey[]>("/api/surveys/available", "GET", null, true)
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

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <span>🎉</span>
          <span>Available Surveys</span>
        </h3>
        {showReturnButton && (
          <Button onClick={onReturnToDashboard} variant="outline">
            Return to Dashboard
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px] text-gray-500 text-lg">
          Loading exciting surveys for you...
        </div>
      ) : surveys.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px] text-gray-500 text-lg">
          No new surveys available at the moment. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">{survey.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{survey.description || "No description provided."}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-semibold text-indigo-600">
                  Reward: <strong>{survey.points_reward} pts</strong>
                </p>
                <Link
                  href={survey.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                >
                  Take Survey
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
