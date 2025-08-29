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
  const [showVideoAd, setShowVideoAd] = useState(true)
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
          true
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
            <p className="text-gray-600">
              Complete offers, tasks, and surveys to earn points and rewards
            </p>
          </div>
          {showReturnButton && (
            <Button onClick={onReturnToDashboard} variant="outline" className="bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
        </div>

        {/* Sponsored Video Section */}
        {showVideoAd && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-pink-600" />
              <h2 className="text-xl font-bold text-gray-900">Sponsored Video</h2>
              <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full font-medium">
                Auto-Play
              </span>
            </div>
            <VideoAdPlayer onVisibilityChange={setShowVideoAd} />
          </div>
        )}

        {/* Sponsored Banner Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Sponsored Banner</h2>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
              Display
            </span>
          </div>
          <div className="bg-white rounded-2xl border-2 border-yellow-200 p-4 flex items-center justify-center">
            <AdZone zoneId="5712666" />
          </div>
        </div>

        {/* BitLabs iframe section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">BitLabs Offers</h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
              Interactive
            </span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-indigo-200 overflow-hidden">
            {bitlabsLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-indigo-600 animate-pulse" />
                </div>
                <p className="text-gray-500 text-lg">Loading BitLabs offers...</p>
              </div>
            ) : bitlabsUrl ? (
              <div className="w-full h-[800px]">
                <iframe
                  src={bitlabsUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="BitLabs Offers"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">BitLabs offers temporarily unavailable</p>
              </div>
            )}
          </div>
        </div>

        {/* Surveys & AdGem Offers */}
        {totalOpportunities === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Additional Opportunities Available
              </h3>
              <p className="text-gray-500 max-w-md">
                Check out the BitLabs offers above, or come back later for more surveys and tasks!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Render surveys */}
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <h3 className="font-bold text-gray-900">{survey.title}</h3>
                <p className="text-gray-600 text-sm">{survey.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-green-600 font-semibold">
                    +{survey.points_reward} pts
                  </span>
                  <Button asChild>
                    <a href={survey.redirect_url} target="_blank" rel="noopener noreferrer">
                      Start Survey
                    </a>
                  </Button>
                </div>
              </div>
            ))}

            {/* Render AdGem offers */}
            {adgemOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <h3 className="font-bold text-gray-900">{offer.title}</h3>
                <p className="text-gray-600 text-sm">{offer.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">
                    +{offer.points_reward} pts
                  </span>
                  <Button asChild>
                    <a href={offer.redirect_url} target="_blank" rel="noopener noreferrer">
                      Claim Offer
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overlay fade animation */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
            }
