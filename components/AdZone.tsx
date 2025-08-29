"use client"
import { useEffect, useRef, useState } from "react"

interface AdZoneProps {
  zoneId?: string
  onVisibilityChange?: (visible: boolean) => void
}

const AdZone = ({ zoneId = "5712666", onVisibilityChange }: AdZoneProps) => {
  const adRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Load ad script dynamically
    const script = document.createElement("script")
    script.src = "https://a.pemsrv.com/ad-provider.js"
    script.async = true
    script.onload = () => {
      try {
        ;(window as any).AdProvider = (window as any).AdProvider || []
        ;(window as any).AdProvider.push({
          serve: {},
          onAdLoaded: () => {
            setVisible(true)
            onVisibilityChange?.(true)
          },
          onNoAd: () => {
            setVisible(false)
            onVisibilityChange?.(false)
          },
        })
      } catch (err) {
        setVisible(false)
        onVisibilityChange?.(false)
      }
    }

    script.onerror = () => {
      setVisible(false)
      onVisibilityChange?.(false)
    }

    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [onVisibilityChange])

  if (!visible) return null

  return (
    <div ref={adRef} className="w-full flex justify-center my-4">
      <ins className="eas6a97888e33" data-zoneid={zoneId} style={{ display: "block" }}></ins>
    </div>
  )
}

export default AdZone
