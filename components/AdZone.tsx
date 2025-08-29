"use client"
import { useEffect, useRef, useState } from "react"

interface AdZoneProps {
  zoneId?: string
  onVisibilityChange?: (visible: boolean) => void
}

const AdZone = ({ zoneId = "5712666", onVisibilityChange }: AdZoneProps) => {
  const adRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://a.magsrv.com/ad-provider.js"
    script.async = true

    script.onload = () => {
      try {
        ;(window as any).AdProvider = (window as any).AdProvider || []
        ;(window as any).AdProvider.push({ serve: {} })

        setTimeout(() => {
          const insElement = adRef.current?.querySelector("ins")
          if (insElement && insElement.innerHTML.trim() !== "") {
            setVisible(true)
            setAdLoaded(true)
            onVisibilityChange?.(true)
          } else {
            setVisible(false)
            setAdLoaded(false)
            onVisibilityChange?.(false)
          }
        }, 2000) // Give ad time to load
      } catch (err) {
        console.error("Ad loading error:", err)
        setVisible(false)
        setAdLoaded(false)
        onVisibilityChange?.(false)
      }
    }

    script.onerror = () => {
      setVisible(false)
      setAdLoaded(false)
      onVisibilityChange?.(false)
    }

    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [onVisibilityChange, zoneId])

  if (!visible || !adLoaded) return null

  return (
    <div ref={adRef} className="w-full flex justify-center">
      <ins className="adsbynetwork" data-zoneid={zoneId} style={{ display: "block" }}></ins>
    </div>
  )
}

export default AdZone
