"use client"

import { useEffect, useRef } from "react"

const VideoAdPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    let adsLoader: any
    let adsManager: any

    const loadVastAd = async () => {
      if (!videoRef.current) return

      try {
        // Load IMA SDK dynamically
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

      // Create container for ads
      const adDisplayContainer = new (window as any).google.ima.AdDisplayContainer(
        adContainer,
        videoRef.current
      )
      adDisplayContainer.initialize()

      adsLoader = new (window as any).google.ima.AdsLoader(adDisplayContainer)

      const adsRequest = new (window as any).google.ima.AdsRequest()
      adsRequest.adTagUrl = "https://s.magsrv.com/v1/vast.php?idzone=5712182" // ExoClick VAST tag

      adsLoader.addEventListener(
        (window as any).google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event: any) => {
          adsManager = event.getAdsManager(videoRef.current)

          try {
            adsManager.init(
              adContainer.clientWidth,
              adContainer.clientHeight,
              (window as any).google.ima.ViewMode.NORMAL
            )
            adsManager.start()
          } catch (adError: any) {
            console.error("AdsManager start error:", adError)
          }
        },
        false
      )

      adsLoader.addEventListener(
        (window as any).google.ima.AdErrorEvent.Type.AD_ERROR,
        (error: any) => {
          console.error("Ad error:", error.getError())
          if (adsManager) adsManager.destroy()
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
      </div>
    </div>
  )
}

export default VideoAdPlayer
