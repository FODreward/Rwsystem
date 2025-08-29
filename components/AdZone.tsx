"use client"; 

import { useEffect } from "react";

declare global {
  interface Window {
    AdProvider: any[];
  }
}

export default function AdZone() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://a.pemsrv.com/ad-provider.js";
    script.async = true;
    script.type = "application/javascript";
    document.body.appendChild(script);

    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({ serve: {} });

    return () => {
      const ads = document.querySelectorAll(
        "script[src*='a.pemsrv.com/ad-provider.js']"
      );
      ads.forEach((s) => s.remove());
    };
  }, []);

  return (
    <ins
      className="eas6a97888e33"
      data-zoneid="5712666"
      style={{ display: "block" }}
    ></ins>
  );
}
