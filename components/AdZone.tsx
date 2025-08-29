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
      const handleAdDisplayed = () => {
        setVisible(true)
        onVisibilityChange?.(true)
      }

      document.addEventListener(`creativeDisplayed-${zoneId}`, handleAdDisplayed, false)

      if (scriptLoadedRef.current) {
        try {
          ;(window as any).AdProvider = (window as any).AdProvider || []
          ;(window as any).AdProvider.push({ serve: {} })
        } catch (err) {
          console.error("Ad serving error:", err)
          setVisible(false)
          onVisibilityChange?.(false)
        }
        return () => {
          document.removeEventListener(`creativeDisplayed-${zoneId}`, handleAdDisplayed, false)
        }
      }

      const script = document.createElement("script")
      script.src = "https://a.pemsrv.com/ad-provider.js"
      script.async = true

      script.onload = () => {
        scriptLoadedRef.current = true
        try {
          ;(window as any).AdProvider = (window as any).AdProvider || []
          ;(window as any).AdProvider.push({ serve: {} })
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

      return () => {
        document.removeEventListener(`creativeDisplayed-${zoneId}`, handleAdDisplayed, false)
      }
    }

    const cleanup = loadAd()
    return cleanup
  }, [onVisibilityChange, zoneId])

  if (!visible) return null

  return (
    <div ref={adRef} className="w-full flex justify-center my-4">
      <ins className="eas6a97888e33" data-zoneid={zoneId} style={{ display: "block" }}></ins>
    </div>
  )
}

export default AdZone
