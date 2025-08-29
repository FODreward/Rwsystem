"use client"

import { useEffect, useRef, useState } from "react"

const VideoAdPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showAd, setShowAd] = useState(false) // 👈 controls visibility
  const [isMuted, setIsMuted] = useState(true) // 👈 mute state

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
        } else {
          initIMA()
        }
      } catch (err) {
        console.error("Ad load failed:", err)
      }
    }

    const initIMA = () => {
      const adContainer = document.getElementById("adContainer")
      if (!adContainer || !videoRef.current) return

      const adDisplayContainer = new (window as any).google.ima.AdDisplayContainer(
        adContainer,
        videoRef.current
      )
      adDisplayContainer.initialize()

      adsLoader = new (window as any).google.ima.AdsLoader(adDisplayContainer)

      const adsRequest = new (window as any).google.ima.AdsRequest()
      adsRequest.adTagUrl = "https://s.magsrv.com/v1/vast.php?idzone=5712182"

      adsLoader.addEventListener(
        (window as any).google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event: any) => {
          adsManager = event.getAdsManager(videoRef.current)

          try {
            setShowAd(true) // 👈 show ad container
            adsManager.init(
              adContainer.clientWidth,
              adContainer.clientHeight,
              (window as any).google.ima.ViewMode.NORMAL
            )
            adsManager.start()

            adsManager.addEventListener(
              (window as any).google.ima.AdEvent.Type.COMPLETE,
              () => setShowAd(false) // 👈 hide when ad ends
            )

            adsManager.addEventListener(
              (window as any).google.ima.AdEvent.Type.SKIPPED,
              () => setShowAd(false) // 👈 hide if skipped
            )
          } catch (adError: any) {
            console.error("AdsManager start error:", adError)
            setShowAd(false)
          }
        },
        false
      )

      adsLoader.addEventListener(
        (window as any).google.ima.AdErrorEvent.Type.AD_ERROR,
        (error: any) => {
          console.error("Ad error:", error.getError())
          if (adsManager) adsManager.destroy()
          setShowAd(false) // hide if error
        },
        false
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
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  if (!showAd) return null // 👈 nothing rendered when no ad

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

        {/* 🔊 Unmute/Mute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-black text-sm font-medium px-3 py-1 rounded-full shadow-lg"
        >
          {isMuted ? "Unmute 🔊" : "Mute 🔇"}
        </button>
      </div>
    </div>
  )
}

export default VideoAdPlayer
