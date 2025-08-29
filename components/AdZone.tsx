"use client";
import { useEffect, useRef, useState } from "react";

const AdZone = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Load ad script dynamically
    const script = document.createElement("script");
    script.src = "https://a.pemsrv.com/ad-provider.js";
    script.async = true;
    script.onload = () => {
      try {
        (window as any).AdProvider = (window as any).AdProvider || [];
        (window as any).AdProvider.push({
          serve: {},
          onAdLoaded: () => setVisible(true),  // Show container only if ad loads
          onNoAd: () => setVisible(false),     // Hide container if no ad
        });
      } catch (err) {
        setVisible(false);
      }
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  if (!visible) return null; // Nothing renders if no ad is available

  return (
    <div ref={adRef} className="w-full flex justify-center">
      <ins
        className="eas6a97888e33"
        data-zoneid="5712666"
        style={{ display: "block" }}
      ></ins>
    </div>
  );
};

export default AdZone;
