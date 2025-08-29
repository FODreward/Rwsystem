"use client"

import { useEffect, useState } from "react"
import { Gift, Clock, ArrowLeft, Globe } from "lucide-react"
import { apiCall } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import VideoAdPlayer from "@/components/VideoAdPlayer"
import AdZone from "@/components/AdZone"

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
  const [bitlabsUrl, setBitlabsUrl] = useState<string>("")
  const [bitlabsLoading, setBitlabsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showPointsOverlay, setShowPointsOverlay] = useState<{ visible: boolean; points: number }>({
    visible: false,
    points: 0,
  })
  const [showVideoAd, setShowVideoAd] = useState(false)
  const [showBannerAd, setShowBannerAd] = useState(false)
  const { toast } = useToast()

  // --- Load surveys/offers ---
  useEffect(() => {
    const loadOffersAndSurveys = async () => {
      setIsLoading(true)
      try {
        const [surveysData, adgemData, bitlabsData] = await Promise.all([
          apiCall<Survey[]>("/surveys/available", "GET", null, true),
          apiCall<AdGemOffer[]>("/surveys/adgem/available", "GET", null, true),
          apiCall<{ url: string }>("/surveys/bitlabs/url", "GET", null, true),
        ])
        setSurveys(surveysData)
        setAdgemOffers(adgemData)
        setBitlabsUrl(bitlabsData.url)
        setBitlabsLoading(false)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load offers and surveys.",
          variant: "destructive",
        })
        setBitlabsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    loadOffersAndSurveys()
  }, [toast])

  const totalOpportunities = surveys.length + adgemOffers.length

  // --- Reward endpoint: fires once per page visit ---
  useEffect(() => {
    const rewardUserOnce = async () => {
      try {
        const res = await apiCall<{ status: string; points_awarded: number }>(
          "/rewards/quick-check",
          "POST",
          null,
          true,
        )
        if (res.points_awarded > 0) {
          toast({
            title: "Points Awarded!",
            description: `You earned ${res.points_awarded} points.`,
            variant: "success",
          })
          setShowPointsOverlay({ visible: true, points: res.points_awarded })
          setTimeout(() => setShowPointsOverlay({ visible: false, points: 0 }), 3500)
        }
      } catch (err: any) {
        console.error("Reward endpoint error:", err)
      }
    }

    rewardUserOnce()
  }, [])

  // --- Auto-play video ads on mount ---
  useEffect(() => {
    setShowVideoAd(true)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {/* ... your existing loading UI ... */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      {/* Points Overlay */}
      {showPointsOverlay.visible && (
        <div className="fixed top-16 right-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-50 animate-fade-in-out">
          🎉 You earned {showPointsOverlay.points} points!
        </div>
      )}

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

        {/* Auto-play video ad */}
        {showVideoAd && <VideoAdPlayer onVisibilityChange={setShowVideoAd} />}
        {/* Banner ad fallback */}
        {showBannerAd && <AdZone zoneId="5712666" onVisibilityChange={setShowBannerAd} />}

        {/* BitLabs iframe section */}
        {/* ... your existing BitLabs iframe code ... */}

        {/* Surveys & AdGem Offers */}
        {/* ... your existing surveys & AdGem rendering code ... */}
      </div>

      {/* Overlay fade animation */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out { animation: fade-in-out 3.5s ease-in-out forwards; }
      `}</style>
    </div>
  )
}
