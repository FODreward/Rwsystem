"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle, Gift, FileText, Clock } from "lucide-react"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Question {
  question_id: number
  text: string
  options: string[]
}

interface CompletionResponse {
  status: "completed"
  rewarded?: boolean
  points?: number
}

interface InternalSurvey {
  survey_id: number
  title: string
  question_count: number
}

export default function InternalSurveyTaker({
  survey,
  onBack,
  onComplete,
}: {
  survey: InternalSurvey
  onBack: () => void
  onComplete: (points?: number) => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [rewardPoints, setRewardPoints] = useState<number>(0)
  const { toast } = useToast()

  useEffect(() => {
    fetchNextQuestion()
  }, [])

  const fetchNextQuestion = async () => {
    try {
      setIsLoading(true)
      const response = await apiCall<Question | CompletionResponse>(
        `/surveys/${survey.survey_id}/next`,
        "GET",
        null,
        true,
      )

      if ("status" in response && response.status === "completed") {
        setIsCompleted(true)
        if (response.rewarded && response.points) {
          setRewardPoints(response.points)
        }
      } else {
        setCurrentQuestion(response as Question)
        setSelectedAnswer("")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load question.",
        variant: "destructive",
      })
      onBack()
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) return

    try {
      setIsSubmitting(true)
      const response = await apiCall<CompletionResponse>(
        `/surveys/${survey.survey_id}/submit`,
        "POST",
        {
          question_id: currentQuestion.question_id,
          answer: selectedAnswer,
        },
        true,
      )

      if (response.status === "completed") {
        setIsCompleted(true)
        if (response.rewarded && response.points) {
          setRewardPoints(response.points)
          toast({
            title: "Survey Completed!",
            description: `You earned ${response.points} points!`,
            variant: "default",
          })
        }
      } else {
        // Fetch next question
        await fetchNextQuestion()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit answer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Survey Completed!</h2>
              <p className="text-gray-600 mb-4">Thank you for completing "{survey.title}"</p>
              {rewardPoints > 0 && (
                <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                  <div className="flex items-center justify-center space-x-2">
                    <Gift className="h-5 w-5 text-green-600" />
                    <span className="text-lg font-semibold text-gray-900">You earned {rewardPoints} points!</span>
                  </div>
                </div>
              )}
              <Button onClick={() => onComplete(rewardPoints)} className="bg-green-600 hover:bg-green-700">
                Return to Surveys
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-500 text-lg">Loading question...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="outline" className="bg-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Surveys
          </Button>
          <div className="text-sm text-gray-500">Survey: {survey.title}</div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Question</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{currentQuestion.text}</h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAnswer === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedAnswer === option ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}
                      >
                        {selectedAnswer === option && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Answer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
