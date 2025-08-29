"use client"

import { useEffect, useRef, useState } from "react"

interface VideoAdPlayerProps {
  onVisibilityChange?: (visible: boolean) => void
}

const VideoAdPlayer = ({ onVisibilityChange }: VideoAdPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showAd, setShowAd] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    let adsLoader: any
    let adsManager: any

    const loadVastAd = async () => {
      if (!videoRef.current) return

      try {
        if (!(window as any).google?.ima) {
          const imaScript = document.createElement("script")
          imaScript.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
          imaScript.async = true
          document.body.appendChild(imaScript)

          imaScript.onload = () => initIMA()
          imaScript.onerror = () => {
            setShowAd(false)
            onVisibilityChange?.(false)
          }
        } else {
          initIMA()
        }
      } catch (err) {
        console.error("Ad load failed:", err)
        setShowAd(false)
        onVisibilityChange?.(false)
      }
    }

    const initIMA = () => {
      const adContainer = document.getElementById("adContainer")
      if (!adContainer || !videoRef.current) return

      const adDisplayContainer = new (window as any).google.ima.AdDisplayContainer(adContainer, videoRef.current)
      adDisplayContainer.initialize()

      adsLoader = new (window as any).google.ima.AdsLoader(adDisplayContainer)

      const adsRequest = new (window as any).google.ima.AdsRequest()
      adsRequest.adTagUrl = "https://s.magsrv.com/v1/vast.php?idzone=5712182"

      adsLoader.addEventListener(
        (window as any).google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event: any) => {
          adsManager = event.getAdsManager(videoRef.current)

          try {
            setShowAd(true)
            onVisibilityChange?.(true)
            adsManager.init(
              adContainer.clientWidth,
              adContainer.clientHeight,
              (window as any).google.ima.ViewMode.NORMAL,
            )
            adsManager.start()

            adsManager.addEventListener((window as any).google.ima.AdEvent.Type.COMPLETE, () => {
              setShowAd(false)
              onVisibilityChange?.(false)
            })
            adsManager.addEventListener((window as any).google.ima.AdEvent.Type.SKIPPED, () => {
              setShowAd(false)
              onVisibilityChange?.(false)
            })
          } catch (adError: any) {
            console.error("AdsManager start error:", adError)
            setShowAd(false)
            onVisibilityChange?.(false)
          }
        },
        false,
      )

      adsLoader.addEventListener(
        (window as any).google.ima.AdErrorEvent.Type.AD_ERROR,
        (error: any) => {
          console.error("Ad error:", error.getError())
          if (adsManager) adsManager.destroy()
          setShowAd(false)
          onVisibilityChange?.(false)
        },
        false,
      )

      adsLoader.requestAds(adsRequest)
    }

    loadVastAd()

    return () => {
      if (adsManager) {
        try {
          adsManager.destroy()
        } catch {}
      }
    }
  }, [onVisibilityChange])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  if (!showAd) return null

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        id="adContainer"
        className="relative w-full h-64 bg-black rounded-2xl shadow-lg overflow-hidden flex items-center justify-center"
      >
        <video
          ref={videoRef}
          id="contentElement"
          className="w-full h-full rounded-2xl object-cover"
          autoPlay
          muted
          playsInline
        />

        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-black text-sm font-medium px-3 py-1 rounded-full shadow-lg"
        >
          {isMuted ? "🔊" : "🔇"}
        </button>
      </div>
    </div>
  )
}

export default VideoAdPlayer
