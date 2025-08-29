"use client"
import { useEffect, useRef, useState } from "react"

interface AdZoneProps {
  zoneId?: string
  onVisibilityChange?: (visible: boolean) => void
}

const AdZone = ({ zoneId = "5712666", onVisibilityChange }: AdZoneProps) => {
  const adRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    const loadAd = () => {
      if (scriptLoadedRef.current) {
        // Script already loaded, just trigger ad serving
        try {
          ;(window as any).AdProvider = (window as any).AdProvider || []
          ;(window as any).AdProvider.push({ serve: {} })

          // Check if ad loaded after a delay
          setTimeout(() => {
            const insElement = adRef.current?.querySelector("ins")
            if (insElement && (insElement.innerHTML.trim() !== "" || insElement.children.length > 0)) {
              setVisible(true)
              onVisibilityChange?.(true)
            } else {
              setVisible(false)
              onVisibilityChange?.(false)
            }
          }, 3000) // Increased timeout for better ad detection
        } catch (err) {
          console.error("Ad serving error:", err)
          setVisible(false)
          onVisibilityChange?.(false)
        }
        return
      }

      // Load script for first time with correct ExoClick URL
      const script = document.createElement("script")
      script.src = "https://a.magsrv.com/ad-provider.js" // Correct ExoClick script URL
      script.async = true

      script.onload = () => {
        scriptLoadedRef.current = true
        try {
          ;(window as any).AdProvider = (window as any).AdProvider || []
          ;(window as any).AdProvider.push({ serve: {} })

          setTimeout(() => {
            const insElement = adRef.current?.querySelector("ins")
            if (insElement && (insElement.innerHTML.trim() !== "" || insElement.children.length > 0)) {
              setVisible(true)
              onVisibilityChange?.(true)
            } else {
              setVisible(false)
              onVisibilityChange?.(false)
            }
          }, 3000)
        } catch (err) {
          console.error("Ad loading error:", err)
          setVisible(false)
          onVisibilityChange?.(false)
        }
      }

      script.onerror = () => {
        console.error("Failed to load ExoClick ad script")
        setVisible(false)
        onVisibilityChange?.(false)
      }

      document.head.appendChild(script)
    }

    loadAd()
  }, [onVisibilityChange, zoneId])

  if (!visible) return null

  return (
    <div ref={adRef} className="w-full flex justify-center my-4">
      <ins className="adsbynetwork" data-zoneid={zoneId} style={{ display: "block" }}></ins>
    </div>
  )
}

export default AdZone
      
