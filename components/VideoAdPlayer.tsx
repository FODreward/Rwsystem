"use client"

import { useEffect, useRef } from "react"

const VideoAdPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const loadVastAd = async () => {
      if (!videoRef.current) return

      try {
        // Load IMA SDK
        const imaScript = document.createElement("script")
        imaScript.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        imaScript.async = true
        document.body.appendChild(imaScript)

        imaScript.onload = () => {
          const adDisplayContainer = new (window as any).google.ima.AdDisplayContainer(
            document.getElementById("adContainer"),
            videoRef.current
          )

          adDisplayContainer.initialize()

          const adsLoader = new (window as any).google.ima.AdsLoader(adDisplayContainer)
          const adsRequest = new (window as any).google.ima.AdsRequest()
          adsRequest.adTagUrl = "https://s.magsrv.com/v1/vast.php?idzone=5712182" // ExoClick tag

          adsLoader.addEventListener(
            (window as any).google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            (event: any) => {
              const adsManager = event.getAdsManager(videoRef.current)
              adsManager.init(640, 360, (window as any).google.ima.ViewMode.NORMAL)
              adsManager.start()
            },
            false
          )

          adsLoader.requestAds(adsRequest)
        }
      } catch (err) {
        console.error("Ad load failed:", err)
      }
    }

    loadVastAd()
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div id="adContainer" className="relative w-full h-64 bg-black rounded-2xl shadow-lg overflow-hidden">
        <video
          ref={videoRef}
          id="contentElement"
          className="w-full h-full rounded-2xl"
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  )
}

export default VideoAdPlayer
